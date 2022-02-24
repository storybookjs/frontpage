const fs = require('fs');
const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);

const { toc: docsToc } = require('./src/content/docs/toc');
const addStateToToc = require('./src/util/add-state-to-toc');
const buildPathWithFramework = require('./src/util/build-path-with-framework');
const createAddonsPages = require('./src/util/create-addons-pages');
const getReleaseBranchUrl = require('./src/util/get-release-branch-url');
const { versionString, latestVersionString, isLatest } = require('./src/util/version-data');
const { versions } = require('./src/util/versions');

const docsTocWithPaths = addStateToToc(docsToc);

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
                  // eslint-disable-next-line no-console
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

const buildLatestPathWithFramework = (slug, framework) =>
  buildPathWithFramework(slug, framework, latestVersionString);

function updateRedirectsFile() {
  const originalContents = fs.readFileSync('./static/_redirects');

  const rawRedirects = fs.readFileSync(path.join(__dirname, './src/util/redirects-raw.txt'), {
    encoding: 'utf-8',
  });
  const redirectsWithFramework = rawRedirects
    .split(/\n/)
    .map((line) => line.split(/\s+/))
    .reduce((acc, [from, to, code]) => {
      frameworks.forEach((f) =>
        // prettier-ignore
        acc.push(`${buildLatestPathWithFramework(from, f)} ${buildLatestPathWithFramework(to, f)} ${code}`)
      );
      return acc;
    }, [])
    .join('\n');

  const versionRedirects = [...versions.stable, ...versions.preRelease, { string: 'next' }]
    .reduce((acc, { string }) => {
      const isLatestLocal = string === latestVersionString;
      const versionStringLocal = string === 'next' ? nextVersionString : string;
      const versionSlug = isLatestLocal ? '' : `/${string}`;
      const versionBranch = isLatestLocal ? '' : getReleaseBranchUrl(versionStringLocal);
      const redirectCode = isLatestLocal ? 301 : 200;

      if (firstDocsPageSlug) {
        acc.push(
          // prettier-ignore
          `/docs${versionSlug} ${versionBranch}${buildPathWithFramework(firstDocsPageSlug, frameworks[0], versionStringLocal)} ${redirectCode}`
        );
        frameworks.forEach((f) =>
          // prettier-ignore
          acc.push(`/docs${versionSlug}/${f} ${versionBranch}${buildPathWithFramework(firstDocsPageSlug, f, versionStringLocal)} ${redirectCode}`)
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

  // prettier-ignore
  fs.writeFileSync('./public/_redirects', `${originalContents}\n\n${redirectsWithFramework}\n\n${versionRedirects}`);
}

exports.onPostBuild = () => {
  generateVersionsFile();
  updateRedirectsFile();
};
