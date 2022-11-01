const path = require('path');
const { validateResponse } = require('./helpers');
const { ADDON_FRAGMENT, RECIPE_FRAGMENT } = require('./constants');

const PAGE_COMPONENT_PATH = path.resolve(
  `./src/components/screens/AddonsCategoryScreen/AddonsCategoryScreen.js`
);

function fetchCategoryPages(createPage, graphql) {
  return graphql(
    `
      {
        integrations {
          categoryPages: tags(isCategory: true) {
            name
            displayName
            description
            icon
            integrations: topIntegrations(sort: monthlyDownloads) {
              addons {
                ${ADDON_FRAGMENT}
              }

              recipes {
                ${RECIPE_FRAGMENT}
                addons {
                  ${ADDON_FRAGMENT}
                }
              }
            }
          }
        }
      }
    `
  )
    .then(validateResponse((data) => data.integrations.categoryPages))
    .then(({ data }) => data.integrations.categoryPages)
    .then((categoryPages) => generateCategoryPages(createPage, categoryPages));
}

function generateCategoryPages(createPage, categoryPages) {
  categoryPages.forEach((category) => {
    const pagePath = `/integrations/tag/${category.name}/`;
    createPage({
      path: pagePath,
      component: PAGE_COMPONENT_PATH,
      context: {
        category: category.displayName,
        description: category.description,
        integrations: category.integrations,
      },
    });
    console.log(` ✅ ${pagePath}`);
  });
}

module.exports = function createCategoryPages(createPage, graphql) {
  console.log(`
🗂️ Creating category pages
`);

  return fetchCategoryPages(createPage, graphql);
};
