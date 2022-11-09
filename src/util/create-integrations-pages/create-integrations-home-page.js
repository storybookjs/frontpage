const path = require('path');
const { ADDON_FRAGMENT, RECIPE_FRAGMENT } = require('./constants');

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
            integrations {
              popularMonthly: topIntegrations(sort: featuredMonthly, limit: 6) {
                addons {
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
                recipes {
                  ${RECIPE_FRAGMENT}
                  tags {
                    name
                    displayName
                    description
                    icon
                  }
                }
              }
              popularYearly: topIntegrations(sort: featuredYearly, limit: 6) {
                addons {
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
                recipes {
                  ${RECIPE_FRAGMENT}
                  tags {
                    name
                    displayName
                    description
                    icon
                  }
                }
              }
              trending: topIntegrations(sort: trending, limit: 12) {
                addons {
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
                recipes {
                  ${RECIPE_FRAGMENT}
                  tags {
                    name
                    displayName
                    description
                    icon
                  }
                }
              }
            }
          }
        `
      )
    )
    .then(
      validateResponse(
        (data) =>
          data.integrations.popularMonthly &&
          data.integrations.popularYearly &&
          data.integrations.trending
      )
    )
    .then(({ data }) => data.integrations)
    .then((integrationsData) => {
      generateIntegrationHomePage(createPage, integrationsData);
    });
}

function generateIntegrationHomePage(createPage, { popularMonthly, popularYearly, trending }) {
  createPage({
    path: '/integrations/',
    component: PAGE_COMPONENT_PATH,
    context: {
      popularAddons: {
        MONTH: popularMonthly.addons,
        YEAR: popularYearly.addons,
      },
      popularRecipes: {
        MONTH: popularMonthly.recipes,
        YEAR: popularYearly.recipes,
      },
      trendingAddons: trending.addons,
    },
  });
  console.log(` ✅ /integrations/`);
}

module.exports = function createIntegrationsHomePage(createPage, graphql) {
  console.log(`
🧩 Creating Integrations home page
`);

  return fetchIntegrationsHomePage(createPage, graphql);
};
