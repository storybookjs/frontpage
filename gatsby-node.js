const fs = require('fs');
const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);
const {
  buildPathWithFramework,
  buildPathWithVersionAndFramework,
} = require('./src/util/build-path-with-framework');
const createAddonsPages = require('./src/util/create-addons-pages');

const { toc: docsToc } = require('./src/content/docs/toc');
const { version: nextVersionFull } = require('./src/content/docs/next-package.json');
const { earliestDocsVersion, latestVersion } = require('./site-metadata');

function shortenVersion(version) {
  return version.match(/^\d+\.\d+/)[0];
}

const { BRANCH } = process.env;
let versionFromBranch;
const nextVersion = shortenVersion(nextVersionFull);
const NEXT_BRANCH = 'next';
if (BRANCH === NEXT_BRANCH) {
  versionFromBranch = nextVersion;
} else if (BRANCH && BRANCH.includes('release-')) {
  versionFromBranch = BRANCH.replace(/^release-(\d+)-(\d+)/, '$1.$2');
} else {
  versionFromBranch = null; // latest version of docs is un-versioned
}

const githubDocsBaseUrl = 'https://github.com/storybookjs/storybook/tree/next';
const addStateToToc = (items, pathPrefix = '/docs') =>
  items.map((item) => {
    const itemPath = item.pathSegment ? `${pathPrefix}/${item.pathSegment}` : pathPrefix;

    return {
      ...item,
      ...(item.type.match(/link/) && {
        path: itemPath,
        githubUrl: `${githubDocsBaseUrl}${itemPath}.md`,
      }),
      ...(item.children && { children: addStateToToc(item.children, itemPath) }),
    };
  });

const docsTocWithPaths = addStateToToc(docsToc);

let versions;
const buildVersions = (releases) =>
  releases.reduce(
    (acc, { node }) => {
      const { version } = node.fields;
      const versionNum = Number(version);
      if (versionNum >= earliestDocsVersion) {
        if (versionNum > latestVersion) {
          const label = nextVersionFull.match(/-(\w+)\./)[1];
          acc.preRelease.push({
            version,
            label,
            number: versionNum,
            string: version,
          });
        } else if (versionNum === latestVersion) {
          const label = 'latest';
          acc.stable.push({
            version: null,
            label,
            number: versionNum,
            string: `${latestVersion}`,
          });
        } else {
          acc.stable.push({
            version,
            number: versionNum,
            string: version,
          });
        }
      }
      return acc;
    },
    { stable: [], preRelease: [] }
  );

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
      const [_, version] = slugParts;
      createNodeField({ node, name: 'iframeSlug', value: `/releases/iframe/${version}/` });
      createNodeField({ node, name: 'version', value: version });
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
          let latestRelease;
          sortedReleases.forEach(({ node }) => {
            const { pageType, iframeSlug, slug, version } = node.fields;
            // Data passed to context is available in page queries as GraphQL variables.
            const context = { pageType, slug, version };

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

            if (!node.frontmatter.prerelease) {
              latestRelease = node;
            }
          });

          // Leave a /releases/ endpoint, but redirect it to the latest version
          if (latestRelease) {
            createRedirect({
              fromPath: `/releases/`,
              isPermanent: false,
              redirectInBrowser: true,
              toPath: latestRelease.fields.slug,
            });
          }

          versions = buildVersions(sortedReleases);
          const frameworks = [...coreFrameworks, ...communityFrameworks];
          const docsPagesSlugs = [];
          const docsPagesEdgesBySlug = Object.fromEntries(
            docsPagesEdges.map((edge) => [edge.node.fields.slug, edge])
          );
          const docsTocByFramework = Object.fromEntries(
            frameworks.map((framework) => [
              framework,
              addStateToToc(
                docsTocWithPaths,
                `/docs/${versionFromBranch ? `${versionFromBranch}/${framework}` : framework}`
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
                    createPage({
                      path: buildPathWithVersionAndFramework(slug, versionFromBranch, framework),
                      component: path.resolve(`./src/components/screens/DocsScreen/DocsScreen.tsx`),
                      context: {
                        pageType,
                        layout: 'docs',
                        slug,
                        version: versionFromBranch,
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
          const firstDocsPageSlug = docsPagesSlugs[0];

          if (firstDocsPageSlug) {
            createRedirect({
              fromPath: `/docs/`,
              isPermanent: false,
              redirectInBrowser: true,
              toPath: buildPathWithFramework(firstDocsPageSlug, frameworks[0]),
            });

            // Setup a redirect for each framework to the first guide
            frameworks.forEach((framework) => {
              createRedirect({
                fromPath: `/docs/${framework}`,
                isPermanent: false,
                redirectInBrowser: true,
                toPath: buildPathWithFramework(firstDocsPageSlug, framework),
              });
            });
          }
        }
      )
      .then(() => {
        return process.env.GATSBY_SKIP_ADDON_PAGES || versionFromBranch
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
  const next = getVersionData(NEXT_BRANCH);
  const data = { ...latest, ...next };
  fs.writeFileSync('./public/versions-raw.json', JSON.stringify(data));
}

function updateRedirectsFile() {
  const originalContents = fs.readFileSync('./static/_redirects');
  const newContents = [...versions.stable, ...versions.preRelease]
    .reduce((acc, { version }) => {
      if (version) {
        const branch =
          version === nextVersion ? NEXT_BRANCH : `release-${version.replace('.', '-')}`;
        acc.push(
          // prettier-ignore
          `/docs/${version}/* https://${branch}--storybook-frontpage.netlify.app/docs/${version}/:splat 200`
        );
      }
      return acc;
    }, [])
    .concat([`/docs/${NEXT_BRANCH}/* /docs/${nextVersion}/:splat 302`])
    .join('\n');
  fs.writeFileSync('./public/_redirects', `${originalContents}\n\n${newContents}`);
}

exports.onPostBuild = () => {
  generateVersionsFile();
  updateRedirectsFile();
};
