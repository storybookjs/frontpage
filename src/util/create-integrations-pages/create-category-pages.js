const path = require('path');
const { validateResponse } = require('./helpers');
const { ADDON_FRAGMENT } = require('./constants');

const PAGE_COMPONENT_PATH = path.resolve(
  `./src/components/screens/AddonsCategoryScreen/AddonsCategoryScreen.js`
);

function fetchAddonsDetailPages(graphql) {
  return graphql(
    `
      {
        addons {
          categoryPages: tags(isCategory: true) {
            name
            displayName
            description
            icon
            addons: top(sort: monthlyDownloads) {
              ${ADDON_FRAGMENT}
            }
          }
        }
      }
    `
  )
    .then(validateResponse((data) => data.addons.categoryPages))
    .then(({ data }) => data.addons.categoryPages);
}

function generateCategoryPages(createPage, categoryPages) {
  categoryPages.forEach((category) => {
    const pagePath = `/addons/tag/${category.name}/`;
    createPage({
      path: pagePath,
      component: PAGE_COMPONENT_PATH,
      context: {
        category: category.displayName,
        description: category.description,
        addons: category.addons,
      },
    });
    console.log(` ✅ ${pagePath}`);
  });
}

module.exports = function createCategoryPages(createPage, graphql) {
  console.log(`
🗂️ Creating category pages
`);

  return fetchAddonsDetailPages(graphql).then((categoryPages) =>
    generateCategoryPages(createPage, categoryPages)
  );
};
