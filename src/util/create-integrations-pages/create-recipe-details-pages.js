const path = require('path');

const buildTagLinks = require('../build-tag-links');
const { wait, validateResponse } = require('./helpers');
const { RECIPE_FRAGMENT, ADDON_FRAGMENT } = require('./constants');

const PAGE_COMPONENT_PATH = path.resolve(
  `./src/components/screens/IntegrationsCatalog/RecipesDetailScreen/RecipesDetailScreen.js`
);

/*

  Used to mock recipe metadata while writing a recipe.
  Nothing should be mocked when being merged into main

*/
const TEMP_RECIPE_METADATA = {
  example: (name) => ({
    // Mock recipe metadata goes here
    // type: 'Recipe',
    // name,
    // displayName: '',
    // description: '',
    // views: 1423,
    // icon: '',
    // accentColor: '#333333',
    // tags: [],
    // authors: [],
    // createdAt: Date.now(),
    // publishedAt: Date.now(),
    // lastUpdatedAt: Date.now(),
  }),
  less: (name) => ({
    // Mock recipe metadata goes here
    type: 'Recipe',
    name,
    displayName: 'Less',
    description:
      'Less is a popular CSS preprocessor that helps you write smaller, reusable styles.',
    views: 1423,
    icon: 'https://camo.githubusercontent.com/12c79be4b05f972b742c079fd5d0c1085729ea21a0d9263300cd6e9fa3ee9366/687474703a2f2f6c6573736373732e6f72672f7075626c69632f696d672f6c6573735f6c6f676f2e706e67',
    accentColor: '#172d50',
    tags: [],
    authors: [],
    createdAt: Date.now(),
    publishedAt: Date.now(),
    lastUpdatedAt: Date.now(),
  }),
};

function parseRecipeFiles({ data }) {
  return data.markdown.edges.reduce((hash, next) => {
    const name = next.node.fields.slug.replace('/recipes/', '');

    return {
      ...hash,
      [name]: {
        readme: next.node.readme,
      },
    };
  }, {});
}

function fetchRecipeMetadata(graphql, name) {
  return graphql(
    `
      {
        integrations {
          metadata: recipe(name: "${name}") {
            ${RECIPE_FRAGMENT}
            status
            publishedAt
            lastUpdatedAt: updatedAt
            tags {
              name
              displayName
              description
              icon
            }
            addons {
              ${ADDON_FRAGMENT}
            }
          }
        }
      }
    `
  )
    .then(validateResponse((data) => data.integrations.metadata))
    .then(({ data }) => data.integrations.metadata);
}

function fetchRecipesDetailPages(createPage, graphql) {
  return wait()
    .then(() =>
      graphql(`
        {
          markdown: allMdx(filter: { fields: { pageType: { eq: "recipes" } } }) {
            edges {
              node {
                fields {
                  slug
                }
                readme: body
              }
            }
          }
        }
      `)
    )
    .then(validateResponse((data) => data.markdown))
    .then(parseRecipeFiles)
    .then((hash) => {
      const promises = Object.entries(hash).map(([name, recipe]) => {
        if (name in TEMP_RECIPE_METADATA) {
          const getMetadata = TEMP_RECIPE_METADATA[name];
          generateRecipesDetailPage(createPage, recipe, getMetadata(name));

          return Promise.resolve();
        }

        return fetchRecipeMetadata(graphql, name).then((metadata) => {
          generateRecipesDetailPage(createPage, recipe, metadata);
        });
      });

      return Promise.all(promises);
    });
}

function generateRecipesDetailPage(createPage, recipe, metadata) {
  const pagePath = `recipes/${metadata.name}`;

  createPage({
    path: pagePath,
    component: PAGE_COMPONENT_PATH,
    context: {
      ...metadata,
      lastUpdatedAt: metadata.lastUpdatedAt,
      tags: buildTagLinks(metadata.tags),
      ...recipe,
    },
  });
  // eslint-disable-next-line
  console.log(` ✅ ${pagePath}`);
}

module.exports = function createRecipeDetailsPages(createPage, graphql) {
  // eslint-disable-next-line
  console.log(`
🥘 Creating recipe details pages
`);

  return fetchRecipesDetailPages(createPage, graphql);
};
