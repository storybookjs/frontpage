const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'content',
    });

    const [pageType, version] = slug.split('/').filter(p => !!p);

    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'pageType', value: pageType });
    createNodeField({ node, name: 'version', value: version });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createRedirect, createPage } = actions;
  createRedirect({
    fromPath: `/docs/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/`,
  });

  return new Promise(resolve => {
    graphql(`
      {
        pages: allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                pageType
                version
              }
            }
          }
        }
      }
    `).then(({ data: { pages: { edges } } }) => {
      edges.forEach(({ node }, index) => {
        const { pageType, slug, version } = node.fields;

        createPage({
          path: slug,
          component: path.resolve(`./src/components/screens/ReleasesScreen/ReleasesScreen.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            pageType,
            slug,
            version,
          },
        });

        // Leave a /releases/ endpoint, but redirect it to the latest version
        if (index + 1 === edges.length) {
          createRedirect({
            fromPath: `/releases/`,
            isPermanent: false,
            redirectInBrowser: true,
            toPath: `/releases/${version}/`,
          });
        }
      });

      resolve();
    });
  });
};
