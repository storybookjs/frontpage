import React from 'react';
import { SocialValidation } from './SocialValidation';

export default {
  title: 'Screens/IndexScreen/SocialValidation',
  component: SocialValidation,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
  excludeStories: ['projects', 'storybooks'],
};

export const projects = [
  {
    name: 'Design System',
    accentColor: {
      hex: '#4c35f5',
    },
    height: 288,
    width: 746,
    logoAlt: 'Monday.com',
    logoUrl: 'https://media.graphassets.com/BBM6cBTiTuLlPvAGtXab',
    projectUrl: 'https://storybook.js.org/showcase/mondaycom-vibe-design-system',
  },
  {
    name: 'Polaris',
    accentColor: {
      hex: '#377e62',
    },
    height: 33,
    width: 118,
    logoAlt: 'Shopify',
    logoUrl: 'https://media.graphassets.com/GNpyBL6rTJyyruBSsG4v',
    projectUrl: 'https://storybook.js.org/showcase/shopify-polaris-react',
  },
  {
    name: 'React Spectrum',
    accentColor: {
      hex: '#e03422',
    },
    height: 32,
    width: 130,
    logoAlt: 'Adobe',
    logoUrl: 'https://media.graphassets.com/voJpj5ySbjALyJ7RUlfw',
    projectUrl: 'https://storybook.js.org/showcase/adobe-spectrum-web-components',
  },
  {
    name: 'Psammead',
    accentColor: {
      hex: '#8F1F19',
    },
    height: 32,
    width: 120,
    logoAlt: 'BBC',
    logoUrl: 'https://media.graphassets.com/To5iQm5VRRGdr5upBBml',
    projectUrl: 'https://storybook.js.org/showcase/bbc-psammead',
  },
  {
    name: 'UI React',
    accentColor: {
      hex: '#000000',
    },
    height: 99,
    width: 284,
    logoAlt: 'Audi',
    logoUrl: 'https://media.graphassets.com/rdYLCbE5Qgm5xGeUfxxJ',
    projectUrl: 'https://storybook.js.org/showcase/audi-ui-react',
  },
  {
    name: 'Gutenberg',
    accentColor: {
      hex: '#3171A6',
    },
    height: 80,
    width: 80,
    logoAlt: 'WordPress',
    logoUrl: 'https://media.graphassets.com/b6N8K1VSuym28UndT2wW',
    projectUrl: 'https://storybook.js.org/showcase/wordpress-gutenberg',
  },
];

export const storybooks = [
  {
    name: 'Monday.com',
    logo: 'https://avatars.githubusercontent.com/u/61420283?v=4',
    image: { src: 'images/home/storybooks/monday-com.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Microsoft',
    logo: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    image: { src: 'images/home/storybooks/microsoft.webp', width: 1440, height: 1050 },
  },
  {
    name: 'D2IQ',
    logo: 'https://avatars.githubusercontent.com/u/19392808?v=4',
    image: { src: 'images/home/storybooks/d2iq.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Drei',
    logo: 'https://avatars.githubusercontent.com/u/45790596?v=4',
    image: { src: 'images/home/storybooks/drei.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Shopify',
    logo: 'https://avatars.githubusercontent.com/u/8085?v=4',
    image: { src: 'images/home/storybooks/shopify.webp', width: 1440, height: 1050 },
  },
  {
    name: 'kickstartDS',
    logo: 'https://avatars.githubusercontent.com/u/79609753?v=4',
    image: { src: 'images/home/storybooks/kickstart-ds.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Grommet',
    logo: 'https://avatars.githubusercontent.com/u/14203820?v=4',
    image: { src: 'images/home/storybooks/grommet.webp', width: 1440, height: 1050 },
  },
  {
    name: 'JSTOR',
    logo: 'https://avatars.githubusercontent.com/u/74469?v=4',
    image: { src: 'images/home/storybooks/jstor.webp', width: 1440, height: 1050 },
  },
];

export const Default = () => (
  <SocialValidation
    docs="/"
    projects={projects}
    storybooks={storybooks}
    twitterFollowerCount={18351}
    discordMemberCount={14930}
    githubContributorCount={1814}
    youTubeSubscriberCount={2650}
  />
);
Default.parameters = {
  backgrounds: { default: 'dark' },
};
