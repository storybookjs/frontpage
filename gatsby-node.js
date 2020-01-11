/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: `/docs/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/`,
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page); // Delete it in order to recreate w/ the right context
  createPage({
    ...page,
    context: {
      ...page.context,
      hasGitHubToken: !!process.env.GITHUB_TOKEN,
    },
  });
};
