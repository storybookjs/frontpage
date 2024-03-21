/* eslint-disable no-param-reassign */
import webpack from 'webpack';

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-webpack5-compiler-babel'],
  staticDirs: ['../static'],
  webpackFinal: async (config) => {
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options = { plugins: [] };
    config.module.rules[0].use[0].options.plugins = [
      require.resolve('babel-plugin-remove-graphql-queries'),
      {
        stage: config.mode === `development` ? 'develop-html' : 'build-html',
        staticQueryDir: 'page-data/sq/d',
      },
    ];

    config.module.rules.push({
      test: /\.(js|ts)x?$/,
      // exclude: [/node_modules\/(?!(gatsby)\/)/],
      include: {
        and: [/node_modules\/((gatsby)\/)/],
        not: [/core-js/],
      },
      use: ['babel-loader'],
    }),
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
    config.resolve.fallback = {
      os: require.resolve('os-browserify/browser'),
      tty: require.resolve('tty-browserify'),
      path: require.resolve('path-browserify'),
    };
    // config.plugins.push(new NodePolyfillPlugin());
    // config.resolve.fallback = {
    //   os: false,
    //   tty: false,
    //   path: false,
    // };

    return config;
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {
    autodocs: true,
  },
};
