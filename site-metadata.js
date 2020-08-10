const {
  coreFrameworks,
  communityFrameworks,
  featureGroups,
} = require('./src/content/docs/frameworks');

const gitHubOrg = `https://github.com/storybookjs`;
const homepageUrl = `https://storybook.js.org`;
const npmApiBase = `https://api.npmjs.org/downloads/point/last-month`;
const docsUrl = `${homepageUrl}/docs`;

const siteMetadata = {
  title: 'Storybook',
  description: `Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular`,
  ogImage: '/images/social/open-graph.png',
  googleSiteVerification: '',
  latestVersion: 'v6.0',
  contributorCount: 1043,
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
    tutorials: `https://www.learnstorybook.com/`,
    addons: `/addons/`,
    community: `/community/`,
    useCases: `/use-cases/`,
    releases: '/releases/',
    support: `/support/`,
    team: `/team/`,

    // Social
    blog: `https://medium.com/storybookjs`,
    medium: `https://medium.com/storybookjs`,
    twitter: `https://twitter.com/storybookjs`,
    chat: `https://discord.gg/UUt2PJb`,
    youtube: `https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg`,

    // Brand
    brand: `${gitHubOrg}/brand`,
    designSystem: `${gitHubOrg}/design-system`,
    badge: `${gitHubOrg}/brand/tree/master/badge`,
    presentation: `${gitHubOrg}/brand/tree/master/presentation`,
    video: `${gitHubOrg}/brand/tree/master/video`,

    // Official addons
    officialAddons: {
      knobs: `${gitHubOrg}/storybook/tree/master/addons/knobs`,
      actions: `${gitHubOrg}/storybook/tree/master/addons/actions`,
      source: `${gitHubOrg}/storybook/tree/master/addons/storysource`,
      info: `${gitHubOrg}/storybook/tree/master/addons/info`,
      docs: `${gitHubOrg}/storybook/tree/master/addons/docs`,
      notes: `${gitHubOrg}/storybook/tree/master/addons/notes`,
      viewport: `${gitHubOrg}/storybook/tree/master/addons/viewport`,
      storyshots: `${gitHubOrg}/storybook/tree/master/addons/storyshots`,
      backgrounds: `${gitHubOrg}/storybook/tree/master/addons/backgrounds`,
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
  ...siteMetadata.urls.navCommunityLinks,
];

module.exports = siteMetadata;
