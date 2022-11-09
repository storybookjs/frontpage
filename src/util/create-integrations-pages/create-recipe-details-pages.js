const path = require('path');
const fs = require('fs');

const buildTagLinks = require('../build-tag-links');
const { wait, validateResponse, createMarkdownProcessor } = require('./helpers');
const { RECIPE_FRAGMENT, ADDON_FRAGMENT } = require('./constants');

const PAGE_COMPONENT_PATH = path.resolve(
  `./src/components/screens/RecipesDetailScreen/RecipesDetailScreen.js`
);

const RECIPE_MARKDOWN_FOLDER = path.resolve(__dirname, '../../', 'content/recipes');

function readRecipeMarkdown(recipeName) {
  return fs.readFileSync(path.resolve(RECIPE_MARKDOWN_FOLDER, `${recipeName}.md`), 'utf8');
}

function fetchRecipesDetailPages(createPage, graphql, skip = 0) {
  return wait()
    .then(() =>
      graphql(
        `
          {
            integrations {
              recipePages: recipes(limit: 30, skip: ${skip}) {
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
    )
    .then(validateResponse((data) => data.integrations.recipePages))
    .then(({ data }) => data.integrations.recipePages)
    .then((recipePages) => {
      if (recipePages.length > 0) {
        generateRecipesDetailPages(createPage, recipePages);
        return fetchRecipesDetailPages(createPage, graphql, skip + recipePages.length);
      }

      return null;
    });
}

function generateRecipesDetailPages(createPage, recipePages) {
  const markdownProcessor = createMarkdownProcessor();

  recipePages.forEach((recipe) => {
    const pagePath = `recipe/${recipe.name}`;
    const rawMarkdown = readRecipeMarkdown(recipe.name);

    createPage({
      path: pagePath,
      component: PAGE_COMPONENT_PATH,
      context: {
        ...recipe,
        lastUpdatedAt: recipe.lastUpdatedAt,
        tags: buildTagLinks(recipe.tags),
        readme: markdownProcessor.processSync(rawMarkdown).toString(),
      },
    });
    console.log(` ✅ ${pagePath}`);
  });
}

module.exports = function createRecipeDetailsPages(createPage, graphql) {
  console.log(`
🥘 Creating recipe details pages
`);

  return fetchRecipesDetailPages(createPage, graphql);
};
