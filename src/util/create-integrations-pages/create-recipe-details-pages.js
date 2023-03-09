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
  bootstrap: (name) => ({
    type: 'Recipe',
    name,
    displayName: 'Bootstrap',
    description: 'Bootstrap is a powerful, extensible, and feature-packed frontend toolkit.',
    views: 1423,
    icon: 'https://camo.githubusercontent.com/2512b49c89512f2ff3718f7257f48ed5c46a4e331abbd890b6c5e8c0e458434f/68747470733a2f2f676574626f6f7473747261702e636f6d2f646f63732f352e322f6173736574732f6272616e642f626f6f7473747261702d6c6f676f2d736861646f772e706e67',
    accentColor: '#333333',
    tags: [],
    authors: [
      {
        id: 'ShaunEvening',
        avatarUrl: 'https://avatars.githubusercontent.com/u/18172605?v=4',
        name: 'ShaunEvening',
      },
    ],
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
