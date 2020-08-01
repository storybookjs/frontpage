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
              pattern: /^(.*)\.md(#.*)?$/,
              replace: '$1$2',
            },
          },
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          // Remove `X-Frame-Options: DENY` default header so that the release notes can
          // be served in an iframe.
          '/*': ['X-XSS-Protection: 1; mode=block', 'X-Content-Type-Options: nosniff'],
        },
        // Do not use the default security headers. Use those we have defined above.
        mergeSecurityHeaders: false,
      },
    },
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/layout/PageLayout'),
      },
    },
  ],
};
