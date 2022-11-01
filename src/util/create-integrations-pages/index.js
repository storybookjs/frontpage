const createIntegrationsHomePage = require('./create-integrations-home-page');
const createCategoryPages = require('./create-category-pages');
const createTagPages = require('./create-tag-pages');
const createAddonDetailsPages = require('./create-addon-details-pages');
const createRecipeDetailsPages = require('./create-recipe-details-pages');

module.exports = function createIntegrationPages({ actions, graphql }) {
  // eslint-disable-next-line no-console
  console.log('🏗️ Creating Integration Catalog pages...');

  const { createPage } = actions;

  return createIntegrationsHomePage(createPage, graphql)
    .then(() => createCategoryPages(createPage, graphql))
    .then(() => createTagPages(createPage, graphql))
    .then(() => createAddonDetailsPages(createPage, graphql))
    .then(() => createRecipeDetailsPages(createPage, graphql));
};
