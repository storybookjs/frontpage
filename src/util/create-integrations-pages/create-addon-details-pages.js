const path = require('path');

const { wait, validateResponse, createMarkdownProcessor } = require('./helpers');
const { ADDON_FRAGMENT } = require('./constants');

const buildTagLinks = require('../build-tag-links');

const PAGE_COMPONENT_PATH = path.resolve(
  `./src/components/screens/AddonsDetailScreen/AddonsDetailScreen.js`
);

function createAddonBaseLink(addon) {
  return `${addon.repositoryUrl || addon.npmUrl}/`;
}

function fetchAddonsDetailPages(createPage, graphql, skip = 0) {
  return wait()
    .then(() =>
      graphql(
        `{
          integrations {
              addonPages: addons(limit: 30, skip: ${skip}) {
                ${ADDON_FRAGMENT}
                tags {
                  name
                  displayName
                  description
                  icon
                }
                compatibility {
                  name
                  displayName
                  icon
                }
                status
                readme
                publishedAt
                repositoryUrl
                homepageUrl
                npmUrl
              }
            }
          }`
      )
    )
    .then(validateResponse((data) => data.integrations.addonPages))
    .then(({ data }) => data.integrations.addonPages)
    .then((addons) => {
      if (addons.length > 0) {
        generateAddonsDetailPages(createPage, addons);
        return fetchAddonsDetailPages(createPage, graphql, skip + addons.length);
      }

      return null;
    });
}

function generateAddonsDetailPages(createPage, addonPages) {
  addonPages.forEach((addon) => {
    const baseLink = createAddonBaseLink(addon);
    const processor = createMarkdownProcessor(baseLink);

    const pagePath = `/addons/${addon.name}/`;

    createPage({
      path: pagePath,
      component: PAGE_COMPONENT_PATH,
      context: {
        ...addon,
        tags: buildTagLinks(addon.tags),
        readme: processor.processSync(addon.readme).toString(),
      },
    });
    console.log(` ✅ ${pagePath}`);
  });
}

module.exports = function createAddonDetailsPages(createPage, graphql) {
  console.log(`
🧩 Creating addon details pages
`);

  return fetchAddonsDetailPages(createPage, graphql);
};
