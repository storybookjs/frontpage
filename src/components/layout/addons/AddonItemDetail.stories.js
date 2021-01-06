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
    displayName: 'Dominic Nguyen',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/263385',
  },
  {
    id: '2',
    displayName: 'Tom Coleman',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
  },
  {
    id: '3',
    displayName: 'Zoltan Olah',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
  },
  {
    id: '4',
    displayName: 'Tim Hingston',
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
  return Number(d);
};

export const OfficialStorybook = Template.bind({});
OfficialStorybook.args = {
  appearance: 'official',
  icon: ControlsSVG,
  name: '@storybook/addon-controls',
  displayName: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  weeklyDownloads: 17143,
  publishedAt: offsetDate(-35),
  npmUrl: 'https://npmjs.org/',
};

export const OfficialIntegrator = Template.bind({});
OfficialIntegrator.args = {
  appearance: 'integrators',
  icon: ContrastPNG,
  name: 'storybook-contrast',
  displayName: 'Contrast',
  description: 'Embed Contrast handoff tool in a storybook panel',
  weeklyDownloads: 17143,
  publishedAt: offsetDate(-5),
  npmUrl: 'https://npmjs.org/',
};

export const Community = Template.bind({});
Community.args = {
  icon: ViewportSVG,
  appearance: 'community',
  displayName: 'Mobile UX Hints',
  name: '@storybook/addon-viewport',
  description:
    'Suggestions on how to tweak the HTML and CSS of your components to be more mobile-friendly.',
  weeklyDownloads: 12253,
  publishedAt: offsetDate(-365),
  npmUrl: 'https://npmjs.org/',
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  name: '@storybook/addon-controls',
  displayName: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  weeklyDownloads: 238,
  publishedAt: offsetDate(-72),
  npmUrl: 'https://npmjs.org/',
};

export const Essential = Template.bind({});
Essential.args = {
  displayName: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  name: '@storybook/addon-controls',
  weeklyDownloads: 238,
  publishedAt: offsetDate(-32),
  npmUrl: 'https://npmjs.org/',
  status: 'essential',
  appearance: 'official',
};

export const Deprecated = Template.bind({});
Deprecated.args = {
  appearance: 'official',
  icon: ControlsSVG,
  displayName: 'Controls',
  name: '@storybook/addon-controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  weeklyDownloads: 17143,
  status: 'deprecated',
  publishedAt: offsetDate(-730),
  npmUrl: 'https://npmjs.org/',
};
