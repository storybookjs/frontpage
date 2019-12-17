const p = require('path');

const getPagePath = (sourceInstanceName, relativeDirectory, name) => {
  switch (sourceInstanceName) {
    case 'docs-master': {
      return `docs/${relativeDirectory}`;
    }
    case 'docs-maintenance': {
      return name.toLowerCase();
    }
    default: {
      const prefix = sourceInstanceName.replace('docs-', '');
      return `docs/${prefix}/${relativeDirectory}`;
    }
  }
};
const getPageScope = path => {
  const l = path.split('/');

  return `/^${l.length > 1 ? l[l.length - 2] : '/'}/`;
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
    const { relativeDirectory, sourceInstanceName, id, name } = node.parent;
    if (!sourceInstanceName || name === '404') {
      return;
    }

    const path = getPagePath(sourceInstanceName, relativeDirectory, name);
    const scope = getPageScope(path);

    createPage({
      path,
      component: p.resolve(`./src/templates/documentation.js`),
      context: {
        id,
        group: sourceInstanceName,
        scope,
      },
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
