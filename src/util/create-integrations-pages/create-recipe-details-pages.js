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
  }),
  sass: (name) => ({
    type: 'Recipe',
    name,
    displayName: 'Sass',
    description:
      'Sass is a popular CSS preprocessor that allows developers to write more maintainable and reusable stylesheets',
    views: 1423,
    icon: 'https://avatars.githubusercontent.com/u/317889',
    accentColor: '#cc6799',
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
