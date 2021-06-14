const communityAddons = [
  {
    name: 'design-assets',
    repository: 'https://github.com/storybookjs/addon-design-assets',
  },
  {
    name: 'events',
    repository: 'https://github.com/storybookjs/addon-events',
  },
  {
    name: 'cssresources',
    repository: 'https://github.com/storybookjs/addon-cssresources',
  },
  {
    name: 'graphql',
    repository: 'https://github.com/storybookjs/addon-graphql',
  },
  {
    name: 'queryparams',
    repository: 'https://github.com/storybookjs/addon-queryparams',
  },
  {
    name: 'google-analytics',
    repository: 'https://github.com/storybookjs/addon-google-analytics',
  },
  {
    name: 'knobs',
    repository: 'https://github.com/storybookjs/addon-knobs',
  },
];

/**
 * Simple function to filter out the addons that are currently not maintained by Storybook
 * @param {string} name name of the community addon
 */
export const fetchCommunityAddons = (name) => {
  const addon = communityAddons.find((addonName) => addonName.name === name);
  if (addon) {
    return addon.repository;
  }
  return null;
};
