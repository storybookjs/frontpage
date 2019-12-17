const p = require('path');

const getPagePath = (sourceInstanceName, relativeDirectory) => {
  switch (sourceInstanceName) {
    case 'docs-master': {
      return `docs/${relativeDirectory}`;
    }
    default: {
      const prefix = sourceInstanceName.replace('docs-', '');
      return `docs/${prefix}/${relativeDirectory}`;
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const {
    data: { allMarkdownRemark },
  } = await graphql(`
    query List {
      allMarkdownRemark {
        nodes {
          parent {
            ... on File {
              sourceInstanceName
              name
              relativeDirectory
            }
            id
          }
        }
      }
    }
  `);

  allMarkdownRemark.nodes.forEach(node => {
    const { relativeDirectory, sourceInstanceName, id } = node.parent;
    if (!relativeDirectory || !sourceInstanceName) {
      return;
    }

    createPage({
      path: getPagePath(sourceInstanceName, relativeDirectory),
      component: p.resolve(`./src/templates/documentation.js`),
      context: { id },
    });
  });
};

// FIX the core-js mess
const coreJsLocationOfRoot = p.join(__dirname, 'node_modules');
const coreJsLocationOfGatsby = p.join(
  __dirname,
  'node_modules',
  'gatsby',
  'node_modules',
  'core-js'
);
exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const CoreJSUpgradeWebpackPlugin = require('corejs-upgrade-webpack-plugin');
  const webpackConfig = getConfig();
  delete webpackConfig.resolve.alias['core-js'];
  webpackConfig.plugins.push(
    // eslint-disable-next-line new-cap
    new CoreJSUpgradeWebpackPlugin.default({
      resolveFrom: [coreJsLocationOfRoot, coreJsLocationOfGatsby],
    })
  );
  actions.replaceWebpackConfig(webpackConfig);
};
