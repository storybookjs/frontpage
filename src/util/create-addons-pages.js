const path = require('path');
const remark = require('remark');
const remarkHTML = require('remark-html');
const buildTagLinks = require('./build-tag-links');

const processor = remark().use(remarkHTML);

const addonDetail = `
  id: name
  name
  displayName
  description
  icon
  authors {
    id: username
    avatarUrl: gravatarUrl
    name: username
  }
  weeklyDownloads
  appearance: verified
  verifiedCreator`;

module.exports = function createAddonsPages({ actions, graphql }) {
  const { createPage } = actions;
  return graphql(
    `
      {
        addons {
          addonPages: top(sort: monthlyDownloads) {
            ${addonDetail}
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
          }
          categoryPages: tags(isCategory: true) {
            name
            displayName
            description
            icon
            addons: top(sort: monthlyDownloads) {
              ${addonDetail}
            }
          }
        }
      }
    `
  )
    .then(
      ({
        data: {
          addons: { addonPages, categoryPages },
        },
      }) => {
        addonPages.forEach((addon) => {
          createPage({
            path: `/addons/${addon.name}`,
            component: path.resolve(
              `./src/components/screens/AddonsDetailScreen/AddonsDetailScreen.js`
            ),
            context: {
              ...addon,
              tags: buildTagLinks(addon.tags),
              readme: processor.processSync(addon.readme).toString(),
            },
          });
        });

        categoryPages.forEach((category) => {
          createPage({
            path: `/addons/${category.name}`,
            component: path.resolve(
              `./src/components/screens/AddonsCategoryScreen/AddonsCategoryScreen.js`
            ),
            context: {
              category: category.displayName,
              description: category.description,
              addons: category.addons,
            },
          });
        });
      }
    )
    .then(() => fetchTagPages(createPage, graphql));
};

function fetchTagPages(createPage, graphql, skip = 0) {
  return graphql(
    `{
      addons {
        tagPages: tags(isCategory: false, limit: 30, skip: ${skip}) {
          name
          displayName
          description
          icon
          addons: top(sort: monthlyDownloads) {
            ${addonDetail}
          }
        }
      }
    }`
  ).then(
    ({
      data: {
        addons: { tagPages },
      },
    }) => {
      if (tagPages.length > 0) {
        createTagPages(createPage, tagPages);
        return fetchTagPages(createPage, graphql, skip + tagPages.length);
      }
    }
  );
}

function createTagPages(createPage, tagPages) {
  tagPages.forEach((tag) => {
    createPage({
      path: `/addons/${tag.name}`,
      component: path.resolve(`./src/components/screens/AddonsTagScreen/AddonsTagScreen.js`),
      context: {
        tag,
        name: tag.name,
      },
    });
  });
}
