const path = require('path');
const { ADDON_FRAGMENT } = require('./constants');

const { wait, validateResponse } = require('./helpers');

const PAGE_COMPONENT_PATH = path.resolve(
  `./src/components/screens/AddonsHomeScreen/AddonsHomeScreen.js`
);

function fetchIntegrationsHomePage(createPage, graphql) {
  return wait()
    .then(() =>
      graphql(
        `
          {
            addons {
              popularMonthly: top(sort: featuredMonthly, limit: 12) {
                ${ADDON_FRAGMENT}
                tags {
                  name
                  displayName
                  description
                  icon
                }
                repositoryUrl
                npmUrl
              }
              popularYearly: top(sort: featuredYearly, limit: 12) {
                ${ADDON_FRAGMENT}
                tags {
                  name
                  displayName
                  description
                  icon
                }
                repositoryUrl
                npmUrl
              }
              trending: top(sort: trending, limit: 12) {
                ${ADDON_FRAGMENT}
                tags {
                  name
                  displayName
                  description
                  icon
                }
                repositoryUrl
                npmUrl
              }
            }
          }
        `
      )
    )
    .then(
      validateResponse(
        (data) => data.addons.popularMonthly && data.addons.popularYearly && data.addons.trending
      )
    )
    .then(({ data }) => data.addons)
    .then((integrationsData) => {
      generateIntegrationHomePage(createPage, integrationsData);
    });
}

function generateIntegrationHomePage(createPage, { popularMonthly, popularYearly, trending }) {
  createPage({
    path: '/addons/',
    component: PAGE_COMPONENT_PATH,
    context: {
      popularAddons: {
        MONTH: popularMonthly,
        YEAR: popularYearly,
      },
      trendingAddons: trending,
    },
  });
  console.log(` ✅ /addons/`);
}

module.exports = function createIntegrationsHomePage(createPage, graphql) {
  console.log(`
🧩 Creating Integrations home page
`);

  return fetchIntegrationsHomePage(createPage, graphql);
};
