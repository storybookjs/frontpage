const createIntegrationsHomePage = require('./create-integrations-home-page');
const createCategoryPages = require('./create-category-pages');
const createTagPages = require('./create-tag-pages');
const createAddonDetailsPages = require('./create-addon-details-pages');
const createRecipeDetailsPages = require('./create-recipe-details-pages');

const {
  DEV_INTEGRATIONS_SKIP_ADDONS,
  DEV_INTEGRATIONS_SKIP_CATEGORIES,
  DEV_INTEGRATIONS_SKIP_RECIPES,
  DEV_INTEGRATIONS_SKIP_TAGS,
} = process.env;

module.exports = function createIntegrationPages({ actions, graphql }) {
  // eslint-disable-next-line no-console
  console.log(`
🏗️ Creating Integration Catalog pages...
`);

  const { createPage } = actions;

  return createIntegrationsHomePage(createPage, graphql)
    .then(() =>
      DEV_INTEGRATIONS_SKIP_CATEGORIES
        ? Promise.resolve()
        : createCategoryPages(createPage, graphql)
    )
    .then(() =>
      DEV_INTEGRATIONS_SKIP_TAGS ? Promise.resolve() : createTagPages(createPage, graphql)
    )
    .then(() =>
      DEV_INTEGRATIONS_SKIP_ADDONS
        ? Promise.resolve()
        : createAddonDetailsPages(createPage, graphql)
    )
    .then(() =>
      DEV_INTEGRATIONS_SKIP_RECIPES
        ? Promise.resolve()
        : createRecipeDetailsPages(createPage, graphql)
    )
    .then(() =>
      // eslint-disable-next-line
      console.log(`

✨   Integration Catalog complete   ✨ 
   
    `)
    );
};
