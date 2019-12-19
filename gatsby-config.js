const { global } = require('@storybook/design-system');
const siteMetadata = require('./site-metadata');
require('dotenv').config();

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs-next`,
        path: `${__dirname}/docs/next/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs-master`,
        path: `${__dirname}/docs/master/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs-addons`,
        path: `${__dirname}/docs/addons/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs-maintenance`,
        path: `${__dirname}/docs/maintenance/`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          urls: [global.fontUrl],
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-source-github-repo',
      options: {
        repoUrl: 'https://github.com/storybooks/storybook',
      },
    },
    {
      resolve: 'gatsby-plugin-segment-js',
      options: {
        prodKey: 'AvvBObOmHaEMqfub8JJUXq5umjsuaqS8',
        trackPage: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
