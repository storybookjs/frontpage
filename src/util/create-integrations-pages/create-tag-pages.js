const path = require('path');

const { wait, validateResponse } = require('./helpers');
const { ADDON_FRAGMENT } = require('./constants');

const PAGE_COMPONENT_PATH = path.resolve(
  `./src/components/screens/AddonsTagScreen/AddonsTagScreen.js`
);

function fetchTagPages(createPage, graphql, skip = 0) {
  return wait()
    .then(() =>
      graphql(
        `{
      addons {
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
          addons: top(sort: monthlyDownloads) {
            ${ADDON_FRAGMENT}
          }
        }
      }
    }`
      )
    )
    .then(validateResponse((data) => data.addons.tagPages))
    .then(({ data }) => data.addons.tagPages)
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
    const pagePath = `/addons/tag/${tag.name}/`;
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
