/* eslint-disable no-param-reassign, global-require */
const p = require('path');

module.exports = {
  stories: ['../src/**/*.stories.(js|ts|tsx)'],
  addons: ['@storybook/addon-actions/register', '@storybook/addon-links/register'],
  presets: [
    {
      name: '@storybook/preset-typescript',
      options: {
        transpileOnly: true,
      },
    },
  ],
  webpack: async config => {
    const coreJsLocationOfRoot = p.join(__dirname, '..', 'node_modules');
    const coreJsLocationOfGatsby = p.join(
      __dirname,
      '..',
      'node_modules',
      'gatsby',
      'node_modules',
      'core-js'
    );

    const CoreJSUpgradeWebpackPlugin = require('corejs-upgrade-webpack-plugin');
    // set the NODE_ENV to 'production' by default, to allow babel-plugin-remove-graphql-queries to remove static queries
    process.env.NODE_ENV = 'production';

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ['browser', 'module', 'main'];

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    config.module.rules[0].test = [/\.(mjs|tsx?|jsx?)$/];

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve('babel-loader');

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-typescript'),
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
    ];

    // use @babel/plugin-proposal-class-properties for class arrow functions
    config.module.rules[0].use[0].options.plugins = [
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('babel-plugin-remove-graphql-queries'),
    ];

    config.plugins.unshift(
      // eslint-disable-next-line new-cap
      new CoreJSUpgradeWebpackPlugin.default({
        resolveFrom: [coreJsLocationOfRoot, coreJsLocationOfGatsby],
      })
    );

    return config;
  },
};
