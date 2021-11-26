const fs = require('fs');
const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);

const { toc: docsToc } = require('./src/content/docs/toc');
const addStateToToc = require('./src/util/add-state-to-toc');
const buildPathWithFramework = require('./src/util/build-path-with-framework');
const createAddonsPages = require('./src/util/create-addons-pages');
const getReleaseBranchUrl = require('./src/util/get-release-branch-url');
const {
  versionString,
  latestVersion,
  latestVersionString,
  isLatest,
} = require('./src/util/version-data');

const VERSION_PARTS_REGEX = /^(\d+\.\d+)(?:\.\d+)?-?(\w+)?(?:\.\d+$)?/;

const docsTocWithPaths = addStateToToc(docsToc);

/* Creates a structure like:
 *
 *  {
 *    "stable": [
 *      { "version": 6.3, "string": "6.3", "label": "latest" },
 *      { "version": 6.2, "string": "6.2" },
 *      { "version": 6.1, "string": "6.1" },
 *      { "version": 6, "string": "6.0" }
 *    ],
 *    "preRelease": [
 *      { "version": 6.4, "string": "6.4", "label": "beta" },
 *      { "version": 7, "string": "7.0", "label": "alpha" }
 *    ]
 *  }
 *
 * Note that the stable releases are sorted in descending order, and pre-releases in ascending.
 *
 * The simple sorting logic will break if the minor version number is >= 10, e.g. 6.10.
 * That seems very unlikely, given our release cadence, so we opted to keep it simple.
 */
const versions = fs
  .readdirSync('./src/generated/versions')
  .filter((v) => v.match(VERSION_PARTS_REGEX))
  .sort((a, b) => parseFloat(b || latestVersion) - parseFloat(a || latestVersion))
  .map((v) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const { version: versionFromFile } = require(`./src/generated/versions/${v}/package.json`);
    const [, string, label] = versionFromFile.match(VERSION_PARTS_REGEX);
    return {
      version: Number(string),
      string,
      label,
    };
  })
  .reduce(
    (acc, v) => {
      if (v.version > latestVersion) {
        acc.preRelease.unshift(v);
      } else {
        acc.stable.push(v);
      }
      return acc;
    },
    {
      stable: [{ version: latestVersion, label: 'latest', string: latestVersionString }],
      preRelease: [],
    }
  );
const nextVersionString = versions.preRelease[0].string;

let frameworks;
let firstDocsPageSlug;

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'content',
      trailingSlash: false,
    });

    const slugParts = slug.split('/').filter((p) => !!p);
    const [pageType] = slugParts;

    createNodeField({ node, name: 'pageType', value: pageType });
    createNodeField({ node, name: 'slug', value: slug });

    if (pageType === 'releases') {
      const [_, releaseVersion] = slugParts;
      createNodeField({ node, name: 'iframeSlug', value: `/releases/iframe/${releaseVersion}/` });
      createNodeField({ node, name: 'version', value: releaseVersion });
    }
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Show a special 404 page for the releases iframe path so that we can identify
  // when a version is passed that where we don't have any docs.
  if (page.path.match(/^\/releases\/iframe\/404\/$/)) {
    const oldPage = { ...page };
    // eslint-disable-next-line no-param-reassign
    page.matchPath = `/releases/iframe/*`;
    // Recreate the modified page
    deletePage(oldPage);
    createPage(page);
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createRedirect, createPage } = actions;
  return new Promise((resolve) => {
    graphql(`
      {
        docsPages: allMdx(filter: { fields: { pageType: { eq: "docs" } } }) {
          edges {
            node {
              fields {
                pageType
                slug
              }
            }
          }
        }
        releasePages: allMdx(filter: { fields: { pageType: { eq: "releases" } } }) {
          edges {
            node {
              fields {
                slug
                iframeSlug
                pageType
                version
              }
              frontmatter {
                prerelease
              }
            }
          }
        }
        site {
          siteMetadata {
            coreFrameworks
            communityFrameworks
          }
        }
      }
    `)
      .then(
        ({
          data: {
            docsPages: { edges: docsPagesEdges },
            releasePages: { edges: releasePagesEdges },
            site: {
              siteMetadata: { coreFrameworks, communityFrameworks },
            },
          },
        }) => {
          const sortedReleases = releasePagesEdges.sort(
            ({ node: aNode }, { node: bNode }) =>
              parseFloat(aNode.fields.version) - parseFloat(bNode.fields.version)
          );
          sortedReleases.forEach(({ node }) => {
            const { pageType, iframeSlug, slug, version: releaseVersion } = node.fields;
            // Data passed to context is available in page queries as GraphQL variables.
            const context = { pageType, slug, version: releaseVersion };

            createPage({
              path: slug,
              component: path.resolve(`./src/components/screens/ReleasesScreen/ReleasesScreen.js`),
              context,
            });

            createPage({
              path: iframeSlug,
              component: path.resolve(
                `./src/components/screens/ReleasesScreen/IframeReleasesScreen.js`
              ),
              context: {
                ...context,
                layout: 'iframe',
              },
            });
          });

          frameworks = [...coreFrameworks, ...communityFrameworks];
          const docsPagesSlugs = [];
          const docsPagesEdgesBySlug = Object.fromEntries(
            docsPagesEdges.map((edge) => [edge.node.fields.slug, edge])
          );
          const docsTocByFramework = Object.fromEntries(
            frameworks.map((framework) => [
              framework,
              addStateToToc(
                docsTocWithPaths,
                `/docs/${isLatest ? framework : `${versionString}/${framework}`}`
              ),
            ])
          );
          const createDocsPages = (tocItems) => {
            tocItems.forEach((tocItem, index) => {
              const { path: docsPagePath, children } = tocItem;

              if (docsPagePath) {
                const docEdge = docsPagesEdgesBySlug[docsPagePath];

                if (docEdge) {
                  const { pageType, slug } = docEdge.node.fields;
                  const nextTocItem = tocItems[index + 1];

                  frameworks.forEach((framework) => {
                    const fullPath = buildPathWithFramework(slug, framework);
                    createPage({
                      path: fullPath,
                      component: path.resolve(`./src/components/screens/DocsScreen/DocsScreen.tsx`),
                      context: {
                        pageType,
                        layout: 'docs',
                        slug,
                        fullPath,
                        versions,
                        framework,
                        docsToc: docsTocByFramework[framework],
                        tocItem,
                        ...(nextTocItem &&
                          nextTocItem.type === 'bullet-link' && {
                            nextTocItem,
                          }),
                        isFirstTocItem: docsPagesSlugs.length === 0,
                      },
                    });
                  });

                  docsPagesSlugs.push(slug);
                } else {
                  console.log(`Not creating page for '${docsPagePath}'`);
                }
              }

              if (children) {
                createDocsPages(children);
              }
            });
          };

          createDocsPages(docsTocWithPaths);
          [firstDocsPageSlug] = docsPagesSlugs;
        }
      )
      .then(() => {
        return process.env.GATSBY_SKIP_ADDON_PAGES || !isLatest
          ? Promise.resolve()
          : createAddonsPages({ actions, graphql });
      })
      .then(() => {
        resolve();
      });
  });
};

function getVersionData(distTag) {
  const versionFile = `./src/content/docs/versions/${distTag}.json`;
  if (!fs.existsSync(versionFile)) {
    return null;
  }
  const data = {
    [distTag]: JSON.parse(fs.readFileSync(versionFile)),
  };
  return data;
}

function generateVersionsFile() {
  const latest = getVersionData('latest');
  const next = getVersionData('next');
  const data = { ...latest, ...next };
  fs.writeFileSync('./public/versions-raw.json', JSON.stringify(data));
}

function updateRedirectsFile() {
  const originalContents = fs.readFileSync('./static/_redirects');
  const newContents = [...versions.stable, ...versions.preRelease, { string: 'next' }]
    .reduce((acc, { string }) => {
      const isLatestLocal = string === latestVersionString;
      const versionStringLocal = string === 'next' ? nextVersionString : string;
      const versionSlug = isLatestLocal ? '' : `/${string}`;
      const versionBranch = isLatestLocal ? '' : getReleaseBranchUrl(versionStringLocal);

      if (firstDocsPageSlug) {
        acc.push(
          // prettier-ignore
          `/docs${versionSlug} ${versionBranch}${buildPathWithFramework(firstDocsPageSlug, frameworks[0], versionStringLocal)} 301`
        );
        frameworks.forEach((f) =>
          // prettier-ignore
          acc.push(`/docs${versionSlug}/${f} ${versionBranch}${buildPathWithFramework(firstDocsPageSlug, f, versionStringLocal)} 301`)
        );
      }

      if (!isLatestLocal) {
        acc.push(`/docs/${string}/* ${versionBranch}/docs/${versionStringLocal}/:splat 200`);
      } else {
        acc.push(`/docs/${versionStringLocal}/* /docs/:splat 301`);
      }

      return acc;
    }, [])
    .concat([`/releases /releases/${latestVersionString} 301`])
    .join('\n');
  fs.writeFileSync('./public/_redirects', `${originalContents}\n\n${newContents}`);
}

exports.onPostBuild = () => {
  generateVersionsFile();
  updateRedirectsFile();
};
