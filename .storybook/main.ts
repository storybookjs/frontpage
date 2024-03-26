/* eslint-disable no-param-reassign */
import webpack from 'webpack';

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-webpack5-compiler-babel'],
  staticDirs: ['../static'],
  babel: () => ({
    plugins: [
      // Use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve('@babel/plugin-transform-class-properties'),
      require.resolve('@babel/plugin-proposal-private-property-in-object'),
      require.resolve('@babel/plugin-proposal-private-methods'),
      require.resolve('@babel/plugin-proposal-class-properties'),

      // Use babel-plugin-remove-graphql-queries to remove graphql queries from components when rendering in Storybook
      // While still rendering content from useStaticQuery in development mode
      [
        require.resolve('babel-plugin-remove-graphql-queries'),
        {
          stage: 'build-html',
          staticQueryDir: 'page-data/sq/d',
        },
      ],
    ],
    presets: [
      require.resolve('@babel/preset-react'),
      [
        require.resolve('@babel/preset-env'),
        {
          shippedProposals: true,
          loose: false,
        },
      ],
      require.resolve('@babel/preset-typescript'),
    ],
  }),
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    // Use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    // config.module.rules[0].test = /\.(js(x)|ts(x))?$/;
    // config.module.rules[0].use[0].loader = require.resolve('babel-loader');
    config.module.rules.push({
      test: /\.(js|ts)x?$/,
      // exclude: [/node_modules\/(?!(gatsby)\/)/],
      include: {
        and: [/node_modules\/((gatsby)\/)/],
        not: [/core-js/],
      },
      use: ['babel-loader'],
    }),
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
