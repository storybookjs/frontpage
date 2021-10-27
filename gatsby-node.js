const fs = require('fs');
const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);

const addStateToToc = require('./src/util/add-state-to-toc');
const buildPathWithFramework = require('./src/util/build-path-with-framework');
const createAddonsPages = require('./src/util/create-addons-pages');
const injectPathSegment = require('./src/util/inject-path-segment');

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
    const [pageType, maybeVersion] = slugParts;
    const version = maybeVersion.match(/^\d+\.\d+$/) ? maybeVersion : null; // null = latest (un-versioned)

    createNodeField({ node, name: 'pageType', value: pageType });
    createNodeField({ node, name: 'version', value: version });
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
                version
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
      }
    `)
      .then(
        ({
          data: {
            docsPages: { edges: docsPagesEdges },
            releasePages: { edges: releasePagesEdges },
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

          const versions = docsPagesEdges.reduce((acc, edge) => {
            const { version } = edge.node.fields;
            if (!acc.includes(version)) {
              acc.push(version);
            }
            return acc;
          }, []);
          const structuredVersions = buildStructuredVersions(versions);
          const docsPagesEdgesBySlug = Object.fromEntries(
            docsPagesEdges.map((edge) => [edge.node.fields.slug, edge])
          );

          versions.forEach((version) => {
            const versionDir = version ? `${version}/` : '';

            const { toc: docsToc } = require(`./src/content/docs/${versionDir}toc`);
            const docsTocWithPaths = addStateToToc(docsToc);
            const docsPagesSlugs = [];

            const {
              coreFrameworks,
              communityFrameworks,
              featureGroups,
            } = require(`./src/content/docs/${versionDir}frameworks`);
            const frameworks = [...coreFrameworks, ...communityFrameworks];
            const docsTocByFramework = Object.fromEntries(
              frameworks.map((framework) => [
                framework,
                addStateToToc(docsTocWithPaths, `/docs/${versionDir}${framework}`),
              ])
            );
            const createDocsPages = (tocItems) => {
              tocItems.forEach((tocItem, index) => {
                const { path: docsPagePath, children } = tocItem;

                if (docsPagePath) {
                  const pagePathWithVersion = version
                    ? injectPathSegment(docsPagePath, version, 2)
                    : docsPagePath;
                  const docEdge = docsPagesEdgesBySlug[pagePathWithVersion];

                  if (docEdge) {
                    const { pageType, slug } = docEdge.node.fields;
                    const nextTocItem = tocItems[index + 1];

                    frameworks.forEach((framework) => {
                      const pagePath = buildPathWithFramework(slug, framework);
                      createPage({
                        path: pagePath,
                        component: path.resolve(
                          `./src/components/screens/DocsScreen/DocsScreen.tsx`
                        ),
                        context: {
                          pageType,
                          layout: 'docs',
                          slug,
                          fullPath: pagePath,
                          framework,
                          coreFrameworks,
                          communityFrameworks,
                          featureGroups,
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
                fromPath: `/docs/${version ? `${version}/` : ''}`,
                isPermanent: false,
                redirectInBrowser: true,
                toPath: buildPathWithFramework(firstDocsPageSlug, frameworks[0]),
              });

              // Setup a redirect for each framework to the first guide
              frameworks.forEach((framework) => {
                createRedirect({
                  fromPath: `/docs/${version ? `${version}/` : ''}${framework}`,
                  isPermanent: false,
                  redirectInBrowser: true,
                  toPath: buildPathWithFramework(firstDocsPageSlug, framework),
                });
              });
            }
          });
        }
      )
      .then(() => {
        return process.env.GATSBY_SKIP_ADDON_PAGES
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

exports.onPostBuild = () => {
  generateVersionsFile();
};
