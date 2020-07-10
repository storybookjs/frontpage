const { global } = require('@storybook/design-system');
const siteMetadata = require('./site-metadata');

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
    'gatsby-transformer-sharp',
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content/`,
      },
    },
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
          {
            resolve: 'gatsby-remark-link-rewrite',
            options: {
              // Strip of trailing .md from links. We want them there in the original source so the
              // relative links work inside github, when you view the .md files directly
              pattern: /^(.*)\.md$/,
              replace: '$1',
            },
          },
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
    'gatsby-plugin-remove-trailing-slashes',
  ],
};
