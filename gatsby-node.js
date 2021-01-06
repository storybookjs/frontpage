const fs = require('fs');
const path = require('path');
const remark = require('remark');
const remarkHTML = require('remark-html');

const { createFilePath } = require(`gatsby-source-filesystem`);

const { toc: docsToc } = require('./src/content/docs/toc');
const buildPathWithFramework = require('./src/util/build-path-with-framework');
const buildTagLinks = require('./src/util/build-tag-links');

const processor = remark().use(remarkHTML);

const githubDocsBaseUrl = 'https://github.com/storybookjs/storybook/tree/next';
const addStateToToc = (items, pathPrefix = '/docs') =>
  items.map((item) => {
    const itemPath = item.pathSegment ? `${pathPrefix}/${item.pathSegment}` : pathPrefix;

    return {
      ...item,
      ...(item.type.match(/link/) && {
        path: itemPath,
        githubUrl: `${githubDocsBaseUrl}${itemPath}.md`,
      }),
      ...(item.children && { children: addStateToToc(item.children, itemPath) }),
    };
  });

const docsTocWithPaths = addStateToToc(docsToc);

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'content',
      trailingSlash: false,
    });

    const slugParts = slug.split('/').filter((p) => !!p);
    const [pageType] = slugParts;

    createNodeField({ node, name: 'pageType', value: pageType });
    createNodeField({ node, name: 'slug', value: slug });

    if (pageType === 'releases') {
      const [_, version] = slugParts;
      createNodeField({ node, name: 'iframeSlug', value: `/releases/iframe/${version}/` });
      createNodeField({ node, name: 'version', value: version });
    }
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Show a special 404 page for the releases iframe path so that we can identify
  // when a version is passed that where we don't have any docs.
  if (page.path.match(/^\/releases\/iframe\/404\/$/)) {
    const oldPage = { ...page };
    // eslint-disable-next-line no-param-reassign
    page.matchPath = `/releases/iframe/*`;
    // Recreate the modified page
    deletePage(oldPage);
    createPage(page);
  }
};

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

exports.createPages = ({ actions, graphql }) => {
  const { createRedirect, createPage } = actions;
  return new Promise((resolve) => {
    graphql(`
      {
        docsPages: allMdx(filter: { fields: { pageType: { eq: "docs" } } }) {
          edges {
            node {
              fields {
                pageType
                slug
              }
            }
          }
        }
        releasePages: allMdx(filter: { fields: { pageType: { eq: "releases" } } }) {
          edges {
            node {
              fields {
                slug
                iframeSlug
                pageType
                version
              }
              frontmatter {
                prerelease
              }
            }
          }
        }
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
          tagPages: tags(isCategory: false) {
            name
            displayName
            description
            icon
            addons: top(sort: monthlyDownloads) {
              ${addonDetail}
            }
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
        site {
          siteMetadata {
            coreFrameworks
            communityFrameworks
          }
        }
      }
    `).then(
      ({
        data: {
          docsPages: { edges: docsPagesEdges },
          releasePages: { edges: releasePagesEdges },
          addons: { addonPages, tagPages, categoryPages },
          site: {
            siteMetadata: { coreFrameworks, communityFrameworks },
          },
        },
      }) => {
        const sortedReleases = releasePagesEdges.sort(
          ({ node: aNode }, { node: bNode }) =>
            parseFloat(aNode.fields.version) - parseFloat(bNode.fields.version)
        );
        let latestRelease;
        sortedReleases.forEach(({ node }) => {
          const { pageType, iframeSlug, slug, version } = node.fields;
          // Data passed to context is available in page queries as GraphQL variables.
          const context = { pageType, slug, version };

          createPage({
            path: slug,
            component: path.resolve(`./src/components/screens/ReleasesScreen/ReleasesScreen.js`),
            context,
          });

          createPage({
            path: iframeSlug,
            component: path.resolve(
              `./src/components/screens/ReleasesScreen/IframeReleasesScreen.js`
            ),
            context: {
              ...context,
              layout: 'iframe',
            },
          });

          if (!node.frontmatter.prerelease) {
            latestRelease = node;
          }
        });

        // Leave a /releases/ endpoint, but redirect it to the latest version
        if (latestRelease) {
          createRedirect({
            fromPath: `/releases/`,
            isPermanent: false,
            redirectInBrowser: true,
            toPath: latestRelease.fields.slug,
          });
        }

        const frameworks = [...coreFrameworks, ...communityFrameworks];
        const docsPagesSlugs = [];
        const docsPagesEdgesBySlug = Object.fromEntries(
          docsPagesEdges.map((edge) => [edge.node.fields.slug, edge])
        );
        const docsTocByFramework = Object.fromEntries(
          frameworks.map((framework) => [
            framework,
            addStateToToc(docsTocWithPaths, `/docs/${framework}`),
          ])
        );
        const createDocsPages = (tocItems) => {
          tocItems.forEach((tocItem, index) => {
            const { path: docsPagePath, children } = tocItem;

            if (docsPagePath) {
              const docEdge = docsPagesEdgesBySlug[docsPagePath];

              if (docEdge) {
                const { pageType, slug } = docEdge.node.fields;
                const nextTocItem = tocItems[index + 1];

                frameworks.forEach((framework) => {
                  createPage({
                    path: buildPathWithFramework(slug, framework),
                    component: path.resolve(`./src/components/screens/DocsScreen/DocsScreen.tsx`),
                    context: {
                      pageType,
                      layout: 'docs',
                      slug,
                      framework,
                      docsToc: docsTocByFramework[framework],
                      tocItem,
                      ...(nextTocItem &&
                        nextTocItem.type === 'bullet-link' && {
                          nextTocItem,
                        }),
                      isFirstTocItem: docsPagesSlugs.length === 0,
                    },
                  });
                });

                docsPagesSlugs.push(slug);
              } else {
                console.log(`Not creating page for '${docsPagePath}'`);
              }
            }

            if (children) {
              createDocsPages(children);
            }
          });
        };

        createDocsPages(docsTocWithPaths);
        const firstDocsPageSlug = docsPagesSlugs[0];

        if (firstDocsPageSlug) {
          createRedirect({
            fromPath: `/docs/`,
            isPermanent: false,
            redirectInBrowser: true,
            toPath: buildPathWithFramework(firstDocsPageSlug, frameworks[0]),
          });

          // Setup a redirect for each framework to the first guide
          frameworks.forEach((framework) => {
            createRedirect({
              fromPath: `/docs/${framework}`,
              isPermanent: false,
              redirectInBrowser: true,
              toPath: buildPathWithFramework(firstDocsPageSlug, framework),
            });
          });
        }

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

        resolve();
      }
    );
  });
};

function getVersionData(distTag) {
  const versionFile = `./src/content/docs/versions/${distTag}.json`;
  if (!fs.existsSync(versionFile)) {
    return null;
  }
  const data = {
    [distTag]: JSON.parse(fs.readFileSync(versionFile)),
  };
  return data;
}

function generateVersionsFile() {
  const latest = getVersionData('latest');
  const next = getVersionData('next');
  const data = { ...latest, ...next };
  fs.writeFileSync('./public/versions-raw.json', JSON.stringify(data));
}

exports.onPostBuild = () => {
  generateVersionsFile();
};
