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

    const [pageType, version] = slug.split('/').filter((p) => !!p);

    createNodeField({ node, name: 'pageType', value: pageType });
    createNodeField({ node, name: 'slug', value: slug });
    if (pageType === 'releases') {
      createNodeField({ node, name: 'iframeSlug', value: `/releases/iframe/${version}/` });
      createNodeField({ node, name: 'version', value: version });
    } else {
      createNodeField({ node, name: 'iframeSlug', value: null });
      createNodeField({ node, name: 'version', value: null });
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
  createRedirect({
    fromPath: `/docs/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/`,
  });

  return new Promise((resolve) => {
    graphql(`
      {
        pages: allMarkdownRemark {
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
          pages: { edges },
        },
      }) => {
        const sortedReleases = edges
          .filter(
            ({
              node: {
                fields: { pageType },
              },
            }) => pageType === 'release'
          )
          .sort(
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

        const docs = edges.filter(
          ({
            node: {
              fields: { pageType },
            },
          }) => pageType === 'docs'
        );
        docs.forEach(({ node }) => {
          const { pageType, slug } = node.fields;
          // Data passed to context is available in page queries as GraphQL variables.
          const context = { pageType, slug };

          createPage({
            path: slug,
            component: path.resolve(`./src/components/screens/DocsScreen/DocsScreen.tsx`),
            context,
          });
        });

        if (docs[0]) {
          createRedirect({
            fromPath: `/docs/`,
            isPermanent: false,
            redirectInBrowser: true,
            toPath: docs[0].node.fields.slug,
          });
        }

        resolve();
      }
    );
  });
};
