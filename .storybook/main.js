/* eslint-disable no-param-reassign */
const webpack = require('webpack');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../static'],
  addons: ['@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  webpack: async (config) => {
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

    config.module.rules[0].use[0].options.plugins.push(
      require.resolve('babel-plugin-remove-graphql-queries')
    );

    // TODO: Figure out why Gatsby is throwing this error:
    // 'The result of this StaticQuery could not be fetched' & remove this alias.
    config.plugins.unshift(
      new webpack.NormalModuleReplacementPlugin(
        /lib\/useSiteMetadata/,
        require.resolve('./useSiteMetadata')
      )
    );

    config.resolve.alias['../../../hooks/use-addons-search'] = require.resolve(
      './use-addons-search.mock.js'
    );

    config.plugins.unshift(
      new webpack.DefinePlugin({
        'process.env.GATSBY_ALGOLIA_API_KEY': JSON.stringify(process.env.GATSBY_ALGOLIA_API_KEY),
      })
    );

    return config;
  },
};
