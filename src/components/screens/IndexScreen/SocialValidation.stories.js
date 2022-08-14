import React from 'react';
import { SocialValidation } from './SocialValidation';

export default {
  title: 'Screens/IndexScreen/SocialValidation',
  component: SocialValidation,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

const projects = [
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

const storybooks = [
  {
    name: 'D2IQ',
    logo: '/d2iq-sb.png',
    image: { src: 'images/home/storybooks/d2iq.png', width: 957, height: 681 },
  },
  {
    name: 'Drei',
    logo: '/d2iq-sb.png',
    image: { src: 'images/home/storybooks/drei.png', width: 957, height: 681 },
  },
  {
    name: 'Grommet',
    logo: '/d2iq-sb.png',
    image: { src: 'images/home/storybooks/grommet.png', width: 957, height: 681 },
  },
  {
    name: 'JSTOR',
    logo: '/d2iq-sb.png',
    image: { src: 'images/home/storybooks/jstor.png', width: 957, height: 681 },
  },
  {
    name: 'kickstartDS',
    logo: '/d2iq-sb.png',
    image: { src: 'images/home/storybooks/kickstart-ds.png', width: 957, height: 681 },
  },
  {
    name: 'Microsoft',
    logo: '/d2iq-sb.png',
    image: { src: 'images/home/storybooks/microsoft.png', width: 957, height: 681 },
  },
  {
    name: 'Monday.com',
    logo: '/d2iq-sb.png',
    image: { src: 'images/home/storybooks/monday-com.png', width: 957, height: 681 },
  },
  {
    name: 'Shopify',
    logo: '/d2iq-sb.png',
    image: { src: 'images/home/storybooks/shopify.png', width: 957, height: 681 },
  },
];

export const Default = () => (
  <SocialValidation docs="/" projects={projects} storybooks={storybooks} />
);
Default.parameters = {
  backgrounds: { default: 'dark' },
};
