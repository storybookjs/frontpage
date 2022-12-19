const path = require('path');

const buildTagLinks = require('../build-tag-links');
const { wait, validateResponse } = require('./helpers');
const { RECIPE_FRAGMENT, ADDON_FRAGMENT } = require('./constants');

const PAGE_COMPONENT_PATH = path.resolve(
  `./src/components/screens/IntegrationsCatalog/RecipesDetailScreen/RecipesDetailScreen.js`
);

const TEMP_RECIPE_METADATA = {
  vuetify: (name) => ({
    type: 'Recipe',
    id: name,
    name,
    icon: 'https://avatars.githubusercontent.com/u/22138497?s=200&v=4',
    accentColor: '#212121',
    displayName: 'Vuetify',
    description:
      "Vuetify is a Vue-based component library designed with Google's Material Design spec.",
    authors: [
      {
        id: 'ShaunLloyd',
        avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
        name: 'Shaun Evening',
      },
    ],
    views: 0,
    tags: [
      {
        icon: '💅',
        displayName: 'Style',
        name: 'style',
      },
    ],
    lastUpdatedAt: Date.now(),
  }),
  tailwindcss: (name) => ({
    type: 'Recipe',
    id: name,
    name,
    icon: 'https://avatars.githubusercontent.com/u/67109815',
    accentColor: '#1c264a',
    displayName: 'Tailwind CSS',
    description:
      'Tailwind CSS is a utility-first CSS framework packed with classes to build any design, directly in your markup.',
    authors: [
      {
        id: 'ShaunLloyd',
        avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
        name: 'Shaun Evening',
      },
    ],
    views: 0,
    tags: [
      {
        icon: '💅',
        displayName: 'Style',
        name: 'style',
      },
    ],
    lastUpdatedAt: Date.now(),
  }),
  'styled-components': (name) => ({
    type: 'Recipe',
    id: name,
    name,
    icon: 'https://avatars.githubusercontent.com/u/20658825?s=200&v=4',
    accentColor: '#333333',
    displayName: 'Styled Components',
    description:
      'Styled Components is a css-in-js framework to build fast and functional components.',
    authors: [
      {
        id: 'ShaunLloyd',
        avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
        name: 'Shaun Evening',
      },
    ],
    views: 0,
    tags: [
      {
        icon: '💅',
        displayName: 'Style',
        name: 'style',
      },
    ],
    lastUpdatedAt: Date.now(),
  }),
  '@emotion/styled': (name) => ({
    type: 'Recipe',
    id: name,
    name,
    icon: 'https://avatars.githubusercontent.com/u/31557565?s=200&v=4',
    accentColor: '#333333',
    displayName: 'Emotion',
    description: 'Emotion is a css-in-js framework to build fast and functional components.',
    authors: [
      {
        id: 'ShaunLloyd',
        avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
        name: 'Shaun Evening',
      },
    ],
    views: 0,
    tags: [
      {
        icon: '💅',
        displayName: 'Style',
        name: 'style',
      },
    ],
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
