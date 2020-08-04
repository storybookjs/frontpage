const path = require('path');
const { toc: docsToc } = require('./src/content/docs/toc');

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
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
    } else {
      const [_, pathPrefix, page] = slugParts;
      createNodeField({ node, name: 'tocPath', value: `/${pathPrefix}/${page}` });
      createNodeField({ node, name: 'pathPrefix', value: `/${pathPrefix}` });
      createNodeField({ node, name: 'page', value: page });
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
        docsPages: allMarkdownRemark(filter: { fields: { pageType: { eq: "docs" } } }) {
          edges {
            node {
              fields {
                pathPrefix
                page
                pageType
                slug
                tocPath
              }
            }
          }
        }
        releasePages: allMarkdownRemark(filter: { fields: { pageType: { eq: "releases" } } }) {
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
    `).then(
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
        const createDocsPages = (tocItems) => {
          tocItems.forEach(({ path: docsPagePath, children }) => {
            if (docsPagePath) {
              const docEdge = docsPagesEdges.find(
                ({ node: { fields } }) => fields.tocPath === docsPagePath
              );

              if (docEdge) {
                const { pageType, slug } = docEdge.node.fields;

                createPage({
                  path: slug,
                  component: path.resolve(`./src/components/screens/DocsScreen/DocsScreen.tsx`),
                  context: { pageType, slug, docsToc },
                });

                docsPagesSlugs.push(slug);
              } else {
                console.log(`Not creating page for '/docs${docsPagePath}'`);
              }
            }

            if (children) {
              createDocsPages(children);
            }
          });
        };

        createDocsPages(docsToc);
        const firstDocsPageSlug = docsPagesSlugs[0];

        if (firstDocsPageSlug) {
          createRedirect({
            fromPath: `/docs/`,
            isPermanent: false,
            redirectInBrowser: true,
            toPath: firstDocsPageSlug,
          });
        }

        resolve();
      }
    );
  });
};
