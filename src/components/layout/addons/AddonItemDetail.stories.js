import React from 'react';
import { AddonItemDetail } from './AddonItemDetail';
import ControlsSVG from '../../../images/addon-catalog/controls.svg';
import ViewportSVG from '../../../images/addon-catalog/viewports.svg';
import ContrastPNG from '../../../images/addon-catalog/contrast.png';

export default {
  title: 'Frontpage|layout/addons/AddonItemDetail',
  component: AddonItemDetail,
  chromatic: { viewports: [320, 900] },
};

const authors = [
  {
    id: '1',
    name: 'Dominic Nguyen',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/263385',
  },
  {
    id: '2',
    name: 'Tom Coleman',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
  },
  {
    id: '3',
    name: 'Zoltan Olah',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
  },
  {
    id: '4',
    name: 'Tim Hingston',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
  },
];

const Template = (args) => (
  <AddonItemDetail authors={authors} addonUrl="/addons/controls" {...args} />
);

const today = new Date();

const offsetDate = (offset) => {
  const d = new Date();
  d.setDate(today.getDate() + (offset + 1));
  return d.toISOString();
};

export const OfficialStorybook = Template.bind({});
OfficialStorybook.args = {
  appearance: 'official',
  image: ControlsSVG,
  title: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  downloads: 17143,
  updated: {
    date: offsetDate(-35),
    url: 'https://npmjs.org/',
  },
  packageName: '@storybook/addon-controls',
};

export const OfficialIntegrator = Template.bind({});
OfficialIntegrator.args = {
  appearance: 'integrator',
  image: ContrastPNG,
  title: 'Contrast',
  description: 'Embed Contrast handoff tool in a storybook panel',
  downloads: 17143,
  updated: {
    date: offsetDate(-5),
    url: 'https://npmjs.org/',
  },
  packageName: 'storybook-contrast',
};

export const Community = Template.bind({});
Community.args = {
  image: ViewportSVG,
  appearance: 'community',
  title: 'Mobile UX Hints',
  description:
    'Suggestions on how to tweak the HTML and CSS of your components to be more mobile-friendly.',
  downloads: 12253,
  updated: {
    date: offsetDate(-365),
    url: 'https://npmjs.org/',
  },
  packageName: '@storybook/addon-viewport',
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  title: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  downloads: 238,
  updated: {
    date: offsetDate(-72),
    url: 'https://npmjs.org/',
  },
  packageName: '@storybook/addon-controls',
};

export const Essential = Template.bind({});
Essential.args = {
  title: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  downloads: 238,
  updated: {
    date: offsetDate(-32),
    url: 'https://npmjs.org/',
  },
  status: 'essential',
  appearance: 'official',
  packageName: '@storybook/addon-controls',
};

export const Deprecated = Template.bind({});
Deprecated.args = {
  appearance: 'official',
  image: ControlsSVG,
  title: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  downloads: 17143,
  status: 'deprecated',
  updated: {
    date: offsetDate(-730),
    url: 'https://npmjs.org/',
  },
  packageName: '@storybook/addon-controls',
};
