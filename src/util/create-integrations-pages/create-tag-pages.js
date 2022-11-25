const path = require('path');

const { wait, validateResponse } = require('./helpers');
const { ADDON_FRAGMENT, RECIPE_FRAGMENT } = require('./constants');

const PAGE_COMPONENT_PATH = path.resolve(
  `./src/components/screens/AddonsTagScreen/AddonsTagScreen.js`
);

function fetchTagPages(createPage, graphql, skip = 0) {
  return wait()
    .then(() =>
      graphql(
        `{
          integrations {
            tagPages: tags(isCategory: false, limit: 30, skip: ${skip}) {
              name
              displayName
              description
              icon
              relatedTags {
                name
                displayName
                icon
              }
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
      }`
      )
    )
    .then(validateResponse((data) => data.integrations.tagPages))
    .then(({ data }) => data.integrations.tagPages)
    .then((tagPages) => {
      if (tagPages.length > 0) {
        generateTagPages(createPage, tagPages);
        return fetchTagPages(createPage, graphql, skip + tagPages.length);
      }

      return null;
    });
}

function hasIntegrations({ integrations = {} }) {
  const { addons = [], recipes = [] } = integrations;

  return addons.length || recipes.length;
}

function generateTagPages(createPage, tagPages) {
  tagPages.forEach((tag) => {
    const pagePath = `/integrations/tag/${tag.name}/`;

    if (hasIntegrations(tag)) {
      createPage({
        path: pagePath,
        component: PAGE_COMPONENT_PATH,
        context: {
          tag,
        },
      });

      // eslint-disable-next-line
      console.log(` ✅ ${pagePath}`);
    } else {
      // eslint-disable-next-line
      console.log(` ⚠️ SKIPPED: ${pagePath} (No integrations)`);
    }
  });
}

module.exports = function createTagPages(createPage, graphql) {
  // eslint-disable-next-line
  console.log(`
🏷️ Creating tag pages
`);

  return fetchTagPages(createPage, graphql);
};
