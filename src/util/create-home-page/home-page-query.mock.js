const mockHomePageData = (_) =>
  Promise.resolve({
    storybookProjects: {
      projects: [
        {
          slug: 'shopify-polaris-react',
          logo: {
            url: 'https://media.graphassets.com/GNpyBL6rTJyyruBSsG4v',
            width: 118,
            height: 33,
          },
          logoAlt: 'Shopify',
          name: 'Polaris React',
          accentColor: {
            hex: '#377e62',
          },
        },
        {
          slug: 'bbc-psammead',
          logo: {
            url: 'https://media.graphassets.com/To5iQm5VRRGdr5upBBml',
            width: 120,
            height: 32,
          },
          logoAlt: 'BBC',
          name: 'Psammead',
          accentColor: {
            hex: '#8f1f19',
          },
        },
        {
          slug: 'audi-ui-react',
          logo: {
            url: 'https://media.graphassets.com/rdYLCbE5Qgm5xGeUfxxJ',
            width: 284,
            height: 99,
          },
          logoAlt: 'Audi',
          name: 'UI React',
          accentColor: {
            hex: '#333333',
          },
        },
        {
          slug: 'microsoft-fluent-ui-react',
          logo: {
            url: 'https://media.graphassets.com/Rdzpx6UnSVqd5J8X5fTh',
            width: 151,
            height: 262,
          },
          logoAlt: 'Microsoft',
          name: 'Fluent UI React',
          accentColor: {
            hex: '#0078d4',
          },
        },
        {
          slug: 'wordpress-gutenberg',
          logo: {
            url: 'https://media.graphassets.com/b6N8K1VSuym28UndT2wW',
            width: 97,
            height: 97,
          },
          logoAlt: 'WordPress',
          name: 'Gutenberg',
          accentColor: {
            hex: '#0073aa',
          },
        },
        {
          slug: 'nasa-jpl-explorer-1',
          logo: {
            url: 'https://media.graphassets.com/LEEaxNb7Tvepv6t5Lw9a',
            width: 508,
            height: 142,
          },
          logoAlt: "NASA's Jet Propulsion Laboratory",
          name: 'Explorer 1',
          accentColor: {
            hex: '#0b3d91',
          },
        },
        {
          slug: 'adobe-spectrum-web-components',
          logo: {
            url: 'https://media.graphassets.com/Yrs8q8BSVSMwa06oXF5S',
            width: 30,
            height: 26,
          },
          logoAlt: 'Adobe',
          name: 'Spectrum Web Components',
          accentColor: {
            hex: '#e1251b',
          },
        },
      ],
    },
    dxData: {
      npmDownloads: 18397690,
      twitterFollowerCount: 19179,
      discordMemberCount: 15859,
      githubContributorCount: 1867,
      youTubeSubscriberCount: 3150,
      latestPost: {
        title: 'Storybook for full-stack developers',
        url: 'https://storybook.js.org/blog/storybook-for-full-stack-developers',
      },
    },
  });

module.exports = mockHomePageData;
