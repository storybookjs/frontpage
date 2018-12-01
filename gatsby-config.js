module.exports = {
  siteMetadata: {
    title: 'Storybook',
    siteUrl: `https://storybook.js.org/`,
    description: `Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular`,

    // Navigation
    docsUrl: 'https://storybook.js.org/basics/introduction/',
    addonsUrl: '/addons',
    communityUrl: '/community',
    useCasesUrl: '/use-cases',
    supportUrl: '/support',

    // Social
    gitHubUrl: 'https://github.com/storybooks/storybook/',
    blogUrl: 'https://medium.com/storybookjs',
    twitterUrl: 'https://twitter.com/storybookjs',
    chatUrl: 'https://discord.gg/UUt2PJb',
    youtubeUrl: 'https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
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
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Nunito Sans'],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
