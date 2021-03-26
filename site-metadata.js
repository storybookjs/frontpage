const {
  coreFrameworks,
  communityFrameworks,
  featureGroups,
} = require('./src/content/docs/frameworks');

const isDeployPreview = process.env.CONTEXT === 'deploy-preview';
const homepageUrl = isDeployPreview ? process.env.DEPLOY_PRIME_URL : 'https://storybook.js.org';
const gitHubOrg = `https://github.com/storybookjs`;
const npmApiBase = `https://api.npmjs.org/downloads/point/last-month`;
const docsUrl = `${homepageUrl}/docs`;
const essentialsBase = '/docs/react/essentials';

const siteMetadata = {
  title: 'Storybook',
  description: `Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular`,
  ogImage: '/images/social/open-graph.png',
  ogImageAddons: '/images/social/og-addons.png',
  siteUrl: homepageUrl, // Used for gatsby-plugin-sitemap
  googleSiteVerification: '_OxxMv1o0aRcxPfieLW0BRsMxxIzkpA9Vv6O0AB5xg0',
  latestVersion: 'v6.1',
  contributorCount: 1234,
  coreFrameworks,
  communityFrameworks,
  featureGroups,
  urls: {
    gitHubOrg,
    homepageUrl,
    docsUrl,
    npmApiBase,
    gitHub: {
      repo: `${gitHubOrg}/storybook`,
      frontpage: `${gitHubOrg}/frontpage`,
      issues: `${gitHubOrg}/storybook/issues`,
      releases: `${gitHubOrg}/storybook/releases`,
      contributors: `${gitHubOrg}/storybook/graphs/contributors`,
      brand: `${gitHubOrg}/press`,
    },

    npm: `https://www.npmjs.com/package/@storybook/react`,
    openCollective: `https://opencollective.com/storybook`,

    npmApi: {
      react: `${npmApiBase}/@storybook/react`,
      reactNative: `${npmApiBase}/@storybook/react-native`,
      vue: `${npmApiBase}/@storybook/vue`,
      angular: `${npmApiBase}/@storybook/angular`,
      ember: `${npmApiBase}/@storybook/ember`,
      html: `${npmApiBase}/@storybook/html`,
      svelte: `${npmApiBase}/@storybook/svelte`,
      mithril: `${npmApiBase}/@storybook/mithril`,
      riot: `${npmApiBase}/@storybook/riot`,
      polymer: `${npmApiBase}/@storybook/polymer`,
      preact: `${npmApiBase}/@storybook/preact`,
    },

    // Navigation
    home: homepageUrl,
    docs: '/docs/',
    tutorials: `https://storybook.js.org/tutorials/`,
    addons: `/addons/`,
    community: `/community/`,
    useCases: `/use-cases/`,
    releases: '/releases/',
    support: `/support/`,
    team: `/team/`,
    addonsApi: '/docs/react/addons/addons-api/',

    // Social
    blog: `https://storybook.js.org/blog`,
    medium: `https://medium.com/storybookjs`,
    twitter: `https://twitter.com/storybookjs`,
    chat: `https://discord.gg/storybook`,
    youtube: `https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg`,

    // Brand
    brand: `${gitHubOrg}/brand`,
    designSystem: `${gitHubOrg}/design-system`,
    badge: `${gitHubOrg}/brand/tree/master/badge`,
    presentation: `${gitHubOrg}/brand/tree/master/presentation`,
    video: `${gitHubOrg}/brand/tree/master/video`,

    // Official addons
    officialAddons: {
      docs: '/docs/react/addons/introduction/',
      install: '/docs/react/addons/install-addons/',
      create: '/docs/react/addons/writing-addons/',
      publish: '/docs/react/addons/addon-catalog/',
      controls: `${essentialsBase}/controls`,
      actions: `${essentialsBase}/actions`,
      viewport: `${essentialsBase}/viewport`,
      backgrounds: `${essentialsBase}/backgrounds`,
      toolbars: `${essentialsBase}/toolbars-and-globals`,
      knobs: `${gitHubOrg}/storybook/tree/master/addons/knobs`,
      source: `${gitHubOrg}/storybook/tree/master/addons/storysource`,
      info: `${gitHubOrg}/storybook/tree/master/addons/info`,
      notes: `${gitHubOrg}/storybook/tree/master/addons/notes`,
      storyshots: `${gitHubOrg}/storybook/tree/master/addons/storyshots`,
      accessibility: `${gitHubOrg}/storybook/tree/master/addons/a11y`,
      console: `${gitHubOrg}/storybook-addon-console`,
      links: `${gitHubOrg}/storybook/tree/master/addons/links`,
    },
  },
};

siteMetadata.urls.navCommunityLinks = [
  { title: 'Get involved', href: siteMetadata.urls.community, isGatsby: true },
  { title: 'Use cases', href: siteMetadata.urls.useCases, isGatsby: true },
  { title: 'Support', href: siteMetadata.urls.support, isGatsby: true },
  { title: 'Team', href: siteMetadata.urls.team, isGatsby: true },
];

siteMetadata.urls.navLinks = [
  { title: 'Docs', href: siteMetadata.urls.docsUrl, isGatsby: false },
  { title: 'Tutorials', href: siteMetadata.urls.tutorials, isGatsby: false },
  { title: 'Releases', href: siteMetadata.urls.releases, isGatsby: true },
  { title: 'Addons', href: siteMetadata.urls.addons, isGatsby: true },
  { title: 'Blog', href: siteMetadata.urls.blog, isGatsby: false },
  ...siteMetadata.urls.navCommunityLinks,
];

siteMetadata.urls.addonsLearnLinks = [
  {
    title: 'How to install addons',
    icon: 'book',
    to: siteMetadata.urls.officialAddons.install,
  },
  {
    title: 'Create an addon',
    icon: 'edit',
    to: siteMetadata.urls.officialAddons.create,
  },
  { title: 'Add to the catalog', icon: 'add', to: siteMetadata.urls.officialAddons.publish },
];

module.exports = siteMetadata;
