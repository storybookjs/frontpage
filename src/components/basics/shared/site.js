// eslint-disable import/prefer-default-export

const gitHubOrg = `https://github.com/storybooks`;
const homepageUrl = `https://storybook.js.org`;

export const metadata = {
  title: 'Storybook',
  description: `Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular`,
  ogImage: '/images/social/open-graph.png',
  googleSiteVerification: '',
  latestVersion: 'v5.0',
};

export const url = {
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

  // Navigation
  home: `${homepageUrl}`,
  docs: {
    home: `${homepageUrl}/basics/introduction/`,
    addonInstruction: `${homepageUrl}/addons/writing-addons/`,
  },
  addons: `/addons`,
  community: `/community`,
  useCases: `/use-cases`,
  support: `/support`,
  team: `/team`,

  // Social
  blog: `https://medium.com/storybookjs`,
  twitter: `https://twitter.com/storybookjs`,
  chat: `https://discord.gg/UUt2PJb`,
  youtube: `https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg`,

  // Brand
  brand: `${gitHubOrg}/brand`,
  designSystem: `https://google.com`,
  badge: `${gitHubOrg}/brand/tree/master/badge`,
  presentation: `${gitHubOrg}/brand/tree/master/presentation`,
  video: `${gitHubOrg}/brand/tree/master/video`,

  // Framework docs
  framework: {
    react: `${homepageUrl}/basics/guide-react/`,
    reactNative: `${homepageUrl}/basics/guide-react-native/`,
    vue: `${homepageUrl}/basics/guide-vue/`,
    angular: `${homepageUrl}/basics/guide-angular/`,
    ember: `${homepageUrl}/basics/guide-ember/`,
    html: `${homepageUrl}/basics/guide-html/`,
    svelte: `${homepageUrl}/basics/guide-svelte/`,
    mithril: `${homepageUrl}/basics/guide-mithril/`,
    riot: `${homepageUrl}/basics/guide-riot/`,
  },

  // Official addons
  officialAddons: {
    knobs: `${gitHubOrg}/storybook/tree/next/addons/knobs`,
    actions: `${gitHubOrg}/storybook/tree/next/addons/actions`,
    source: `${gitHubOrg}/storybook/tree/next/addons/storysource`,
    info: `${gitHubOrg}/storybook/tree/next/addons/info`,
    viewport: `${gitHubOrg}/storybook/tree/next/addons/viewport`,
    storyshots: `${gitHubOrg}/storybook/tree/next/addons/storyshots`,
    backgrounds: `${gitHubOrg}/storybook/tree/next/addons/backgrounds`,
    accessibility: `${gitHubOrg}/storybook/tree/next/addons/a11y`,
  },
};
