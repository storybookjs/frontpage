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

function generateTagPages(createPage, tagPages) {
  tagPages.forEach((tag) => {
    const pagePath = `/integrations/tag/${tag.name}/`;
    createPage({
      path: pagePath,
      component: PAGE_COMPONENT_PATH,
      context: {
        tag,
      },
    });
    console.log(` ✅ ${pagePath}`);
  });
}

module.exports = function createTagPages(createPage, graphql) {
  console.log(`
🏷️ Creating tag pages
`);

  return fetchTagPages(createPage, graphql);
};
