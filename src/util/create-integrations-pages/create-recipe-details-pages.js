const path = require('path');

const buildTagLinks = require('../build-tag-links');
const { wait, validateResponse } = require('./helpers');
const { RECIPE_FRAGMENT, ADDON_FRAGMENT } = require('./constants');

const PAGE_COMPONENT_PATH = path.resolve(
  `./src/components/screens/IntegrationsCatalog/RecipesDetailScreen/RecipesDetailScreen.js`
);

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
        if (name === 'vuetify') {
          generateRecipesDetailPage(createPage, recipe, {
            type: 'Recipe',
            id: name,
            name,
            icon: 'https://avatars.githubusercontent.com/u/22138497?s=200&v=4',
            accentColor: '#FFFFFF',
            displayName: 'Vuetify',
            description:
              "Vuetify is a Vue based component library based on Google's material design spec.",
            authors: [
              {
                id: 'ShaunLloyd',
                avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
                name: 'Shaun Evening',
              },
            ],
            views: 103259,
            tags: [
              {
                icon: '💅',
                displayName: 'Style',
                name: 'style',
              },
            ],
            lastUpdatedAt: Date.now(),
          });

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
