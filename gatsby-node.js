const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);

const { toc: docsToc } = require('./src/content/docs/toc');
const buildSlugWithFramework = require('./src/util/build-slug-with-framework');

const githubDocsBaseUrl = 'https://github.com/storybookjs/storybook/tree/next';
const addStateToToc = (items, pathPrefix = '/docs/') =>
  items.map((item) => {
    const itemPath = `${pathPrefix}${item.pathSegment}`;
    // A pathSegment could be an empty string.
    // Make sure there is not a duplicate slash created.
    const itemPathWithDirSuffix = `${itemPath.slice(-1) !== '/' ? `${itemPath}/` : itemPath}`;

    return {
      ...item,
      ...(item.type.match(/link/) && {
        path: itemPathWithDirSuffix,
        githubUrl: `${githubDocsBaseUrl}${itemPath}.md`,
      }),
      ...(item.children && { children: addStateToToc(item.children, itemPathWithDirSuffix) }),
    };
  });

const docsTocWithPaths = addStateToToc(docsToc);

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'content',
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

  if (page.path.match(/^\/docs\//)) {
    // eslint-disable-next-line no-param-reassign
    page.context.layout = 'docs';
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
            frameworks
          }
        }
      }
    `).then(
      ({
        data: {
          docsPages: { edges: docsPagesEdges },
          releasePages: { edges: releasePagesEdges },
          site: {
            siteMetadata: { frameworks },
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
            context,
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

        const docsPagesSlugs = [];
        const docsPagesEdgesBySlug = Object.fromEntries(
          docsPagesEdges.map((edge) => [edge.node.fields.slug, edge])
        );
        const docsTocByFramework = Object.fromEntries(
          frameworks.map((framework) => [
            framework,
            addStateToToc(docsTocWithPaths, `/docs/${framework}/`),
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
                    path: buildSlugWithFramework(slug, framework),
                    component: path.resolve(`./src/components/screens/DocsScreen/DocsScreen.tsx`),
                    context: {
                      pageType,
                      slug,
                      framework,
                      docsToc: docsTocByFramework[framework],
                      tocItem,
                      ...(nextTocItem &&
                        nextTocItem.type === 'bullet-link' && {
                          nextTocItem,
                        }),
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
            toPath: buildSlugWithFramework(firstDocsPageSlug, frameworks[0]),
          });
        }

        resolve();
      }
    );
  });
};
