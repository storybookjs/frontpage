const path = require('path');

const fetchHomePageData = require('./home-page-query');
const mockHomePageData = require('./home-page-query.mock');

const PAGE_COMPONENT_PATH = path.resolve(`./src/components/screens/IndexScreen/IndexScreen.js`);

module.exports = function createHomePage({ createPage }, graphql, useMock = false) {
  // eslint-disable-next-line
  console.log(`
  🏡 Creating ${useMock ? 'MOCKED' : 'Storybook'} home page
  `);
  const getPageData = useMock ? mockHomePageData : fetchHomePageData;

  return getPageData(graphql).then((data) => {
    const {
      storybookProjects,
      dxData: {
        npmDownloads,
        latestPost,
        twitterFollowerCount,
        discordMemberCount,
        githubContributorCount,
        youTubeSubscriberCount,
      },
    } = data;

    const projects = storybookProjects.projects.map(({ slug, logo, ...project }) => ({
      logoUrl: logo.url,
      height: logo.height,
      width: logo.width,
      projectUrl: `https://storybook.js.org/showcase/${slug}`,
      ...project,
    }));

    createPage({
      path: '/',
      component: PAGE_COMPONENT_PATH,
      context: {
        latestBlogPost: latestPost,
        projects,
        npmDownloads,
        twitterFollowerCount,
        discordMemberCount,
        githubContributorCount,
        youTubeSubscriberCount,
      },
    });
  });
};
