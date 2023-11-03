const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const { createFilePath } = require(`gatsby-source-filesystem`);

const DOCS_TABS = require('./src/constants/docs-tabs');
const { toc: docsToc } = require('./src/content/docs/toc');
const addStateToToc = require('./src/util/add-state-to-toc');
const buildPathWithVersion = require('./src/util/build-path-with-version');
const getReleaseBranchUrl = require('./src/util/get-release-branch-url');
const { versionString, latestVersionString, isLatest } = require('./src/util/version-data');
const sourceDXData = require('./src/util/source-dx-data');
const { versions, versionsWithToc } = require('./src/util/versions');
const createIntegrationsPages = require('./src/util/create-integrations-pages');
const createHomePage = require('./src/util/create-home-page');
const siteMetadata = require('./site-metadata');

const {
  urls: { installDocsPageSlug },
  allRenderers,
} = siteMetadata;

const docsPagesSlugs = [];
const [firstDocsTab, ...restDocsTabs] = DOCS_TABS;

const nextVersionString = versions.preRelease[0]?.string || latestVersionString;

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
      },
    },
  });
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  await sourceDXData({ actions, createNodeId, createContentDigest });
};

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
      const [, releaseVersion] = slugParts;
      createNodeField({ node, name: 'iframeSlug', value: `/releases/iframe/${releaseVersion}/` });
      createNodeField({ node, name: 'version', value: releaseVersion });
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
      }
    `)
      .then(
        ({
          data: {
            docsPages: { edges: docsPagesEdges },
            releasePages: { edges: releasePagesEdges },
          },
        }) => {
          const sortedReleases = releasePagesEdges.sort(
            ({ node: aNode }, { node: bNode }) =>
              parseFloat(aNode.fields.version) - parseFloat(bNode.fields.version)
          );
          sortedReleases.forEach(({ node }) => {
            const { pageType, iframeSlug, slug, version: releaseVersion } = node.fields;
            // Data passed to context is available in page queries as GraphQL variables.
            const context = { pageType, slug, version: releaseVersion };

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
          });

          const createDocsPages = (tocItems) => {
            const docsPagesEdgesBySlug = Object.fromEntries(
              docsPagesEdges.map((edge) => [edge.node.fields.slug, edge])
            );

            tocItems.forEach((tocItem, index) => {
              const { path: docsPagePath, children } = tocItem;

              if (docsPagePath) {
                const tabs = [firstDocsTab.id];
                let activeTab = firstDocsTab.id;

                // Loop over possible tabs to see which tabs are relevant to this docsPagePath
                restDocsTabs.forEach(({ id }) => {
                  /**
                   * Matches when:
                   * - docsPagePath matches the current possible tab
                   */
                  if (docsPagePath.endsWith(`/${id}`)) {
                    tabs.push(id);
                    activeTab = id;
                  } else {
                    /**
                     * Loop over all sibling tocItems to see if any of them match the current
                     * possible tab
                     *
                     * Matches when:
                     * - docsPagePath = `/a/b/`
                     * - itemPath     = `/a/b/<current-possible-tab-id>`
                     */
                    tocItems.forEach(({ path: itemPath }) => {
                      if (`${docsPagePath}/${id}` === itemPath) {
                        tabs.push(id);
                      } else {
                        /**
                         * Loop over the possible tabs again (excepting the current tab) to see if
                         * the docsPagePath matches any of those "alternative" tabs *and* the
                         * itemPath matches the current possible tab
                         *
                         * Matches when:
                         * - docsPagePath = `/a/b/<current-alternative-tab-id>`
                         * - itemPath     = `/a/b/<current-possible-tab-id>`
                         */
                        restDocsTabs
                          .filter((tab) => tab.id !== id)
                          .forEach((tab) => {
                            if (
                              docsPagePath.endsWith(`/${tab.id}`) &&
                              docsPagePath.replace(`/${tab.id}`, `/${id}`) === itemPath
                            ) {
                              tabs.push(id);
                            }
                          });
                      }
                    });
                  }
                });

                const docEdge =
                  docsPagesEdgesBySlug[docsPagePath] ||
                  // Translate from path (with /) to slug (with .); slug matches filename
                  docsPagesEdgesBySlug[docsPagePath.replace(`/${activeTab}`, `.${activeTab}`)];

                if (docEdge) {
                  const { pageType, slug } = docEdge.node.fields;

                  let slugAsPath = slug;
                  if (activeTab !== firstDocsTab.id) {
                    // Translate from slug (with .) to path (with /)
                    slugAsPath = slugAsPath.replace(`.${activeTab}`, `/${activeTab}`);
                  }

                  const nextTocItem = tocItems[index + 1];

                  const fullPath = buildPathWithVersion(slugAsPath);
                  createPage({
                    path: fullPath,
                    component: path.resolve(`./src/components/screens/DocsScreen/DocsScreen.tsx`),
                    context: {
                      pageType,
                      layout: 'docs',
                      slug,
                      slugAsPath,
                      fullPath,
                      versions,
                      docsToc: addStateToToc(
                        docsToc,
                        `/docs${isLatest ? '' : `/${versionString}`}`
                      ),
                      tocItem,
                      ...(nextTocItem &&
                        nextTocItem.type === 'bullet-link' && {
                          nextTocItem,
                        }),
                      isInstallPage: slugAsPath === installDocsPageSlug,
                      tabs: tabs.length > 1 ? tabs : null,
                      activeTab,
                    },
                  });

                  docsPagesSlugs.push(slugAsPath);
                } else {
                  // eslint-disable-next-line no-console
                  console.log(`Not creating page for '${docsPagePath}'`);
                }
              }

              if (children) {
                createDocsPages(children);
              }
            });
          };

          createDocsPages(addStateToToc(docsToc));
        }
      )
      .then(() => createHomePage(actions, graphql, process.env.GATSBY_DOCS_ONLY))
      .then(() => {
        return process.env.GATSBY_SKIP_ADDON_PAGES || process.env.GATSBY_DOCS_ONLY || !isLatest
          ? Promise.resolve()
          : createIntegrationsPages({ actions, graphql });
      })
      .then(() => {
        resolve();
      });
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

function generateDocsMetadataFile() {
  const metadata = {
    slugs: docsPagesSlugs,
    versions: [latestVersionString, ...versionsWithToc.map(({ string }) => string)],
  };
  fs.writeFileSync('./src/generated/docs-metadata.json', JSON.stringify(metadata));
}

function updateRedirectsFile() {
  const originalContents = fs.readFileSync('./static/_redirects');

  const rawRedirects = fs.readFileSync(path.join(__dirname, './src/util/redirects-raw.txt'), {
    encoding: 'utf-8',
  });
  const redirectsWithVersion = rawRedirects
    .split(/\n/)
    .map((line) => line.split(/\s+/))
    .filter(([from, to, code]) => from && to && code)
    .map(([from, to, code]) => `${buildPathWithVersion(from)} ${buildPathWithVersion(to)} ${code}`)
    .join('\n');

  const versionRedirects = [...versions.stable, ...versions.preRelease, { string: 'next' }]
    .reduce((acc, { string }) => {
      const isLatestLocal = string === latestVersionString;
      const versionStringLocal = string === 'next' ? nextVersionString : string;
      const versionSlug = isLatestLocal ? '' : `/${string}`;
      const versionBranch = isLatestLocal ? '' : getReleaseBranchUrl(versionStringLocal);
      const redirectCode = isLatestLocal ? 301 : 200;

      acc.push(
        // prettier-ignore
        `/docs${versionSlug} ${versionBranch}${buildPathWithVersion(installDocsPageSlug, versionStringLocal)} ${redirectCode}`
      );

      allRenderers.forEach((r) => {
        acc.push(
          // prettier-ignore
          `/docs${versionSlug}/${r}/* ${versionBranch}/docs${versionSlug}/:splat ${redirectCode}`
        );
      });

      if (!isLatestLocal) {
        acc.push(`/docs/${string}/* ${versionBranch}/docs/${versionStringLocal}/:splat 200`);
      } else {
        acc.push(`/docs/${versionStringLocal}/* /docs/:splat 301`);
      }

      return acc;
    }, [])
    .concat([`/releases /releases/${latestVersionString} 301`])
    .join('\n');

  // prettier-ignore
  fs.writeFileSync('./public/_redirects', `${originalContents}\n\n${redirectsWithVersion}\n\n${versionRedirects}`);
}

const otherSitemaps = [
  'blog/sitemap/sitemap-0.xml',
  'showcase/sitemap-0.xml',
  'tutorials/sitemap/sitemap-0.xml',
];

function getSitemapId(sitemap) {
  return sitemap.split('/')[0];
}

const sitemapFilename = 'sitemap.xml';

/* eslint-disable no-restricted-syntax, no-await-in-loop */
async function copyOtherSitemaps() {
  for (const sitemap of otherSitemaps) {
    const sitemapId = getSitemapId(sitemap);

    const directory = `./public/sitemap/${sitemapId}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    try {
      const response = await fetch(`https://storybook.js.org/${sitemap}`);
      const content = await response.text();
      fs.writeFileSync(`./public/sitemap/${sitemapId}/${sitemapFilename}`, content);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
/* eslint-enable no-restricted-syntax, no-await-in-loop */

async function updateSitemapIndex() {
  const data = await fs.promises.readFile('./public/sitemap/sitemap-index.xml');
  const originalContents = data.toString();

  const newLocations = otherSitemaps
    .map(
      (sitemap) =>
        // prettier-ignore
        `<sitemap><loc>https://storybook.js.org/sitemap/${getSitemapId(sitemap)}/${sitemapFilename}</loc></sitemap>`
    )
    .join('');

  const newContent = originalContents.replace(/(<sitemap>.*<\/sitemap>)/, `$1${newLocations}`);

  fs.writeFileSync('./public/sitemap/sitemap-index.xml', newContent);
}

exports.onPostBuild = async () => {
  generateDocsMetadataFile();

  if (isLatest) {
    await copyOtherSitemaps();
    await updateSitemapIndex();
    generateVersionsFile();
    generateDocsMetadataFile();
    updateRedirectsFile();
  }
};
