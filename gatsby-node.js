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

    const [pageType, versionOrPrefix, page] = slug.split('/').filter((p) => !!p);

    createNodeField({ node, name: 'pageType', value: pageType });
    createNodeField({ node, name: 'slug', value: slug });
    if (pageType === 'releases') {
      createNodeField({ node, name: 'iframeSlug', value: `/releases/iframe/${versionOrPrefix}/` });
      createNodeField({ node, name: 'version', value: versionOrPrefix });
      createNodeField({ node, name: 'prefix', value: null });
      createNodeField({ node, name: 'page', value: null });
    } else {
      createNodeField({ node, name: 'iframeSlug', value: null });
      createNodeField({ node, name: 'version', value: null });
      createNodeField({ node, name: 'prefix', value: versionOrPrefix });
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
        pages: allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                iframeSlug
                pageType
                version
                prefix
                page
              }
              frontmatter {
                prerelease
              }
            }
          }
        }
        site {
          siteMetadata {
            docsToc {
              prefix
              pages
            }
          }
        }
      }
    `).then(
      ({
        data: {
          pages: { edges },
          site: {
            siteMetadata: { docsToc },
          },
        },
      }) => {
        const sortedReleases = edges
          .filter((e) => e.node.fields.pageType === 'releases')
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

        const docNodes = edges.map((e) => e.node).filter((n) => n.fields.pageType === 'docs');
        docsToc.forEach(({ prefix, pages }) => {
          pages.forEach((page) => {
            const docNode = docNodes.find(
              ({ fields }) => fields.prefix === prefix && fields.page === page
            );

            if (docNode) {
              const { pageType, slug } = docNode.fields;
              createPage({
                path: slug,
                component: path.resolve(`./src/components/screens/DocsScreen/DocsScreen.tsx`),
                context: { pageType, slug },
              });
            } else {
              console.log(`Not creating page for '/docs/${prefix}/${page}/'`);
            }
          });
        });

        const firstDocsPage = docsToc[0].pages[0];
        if (firstDocsPage) {
          createRedirect({
            fromPath: `/docs/`,
            isPermanent: false,
            redirectInBrowser: true,
            toPath: `/docs/${docsToc[0].prefix}/${firstDocsPage}`,
          });
        }

        resolve();
      }
    );
  });
};
