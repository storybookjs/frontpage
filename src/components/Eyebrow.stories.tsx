import React from 'react';
import { Eyebrow } from './Eyebrow';

export default {
  title: 'Components/Eyebrow',
  component: Eyebrow,
  parameters: {
    chromatic: { viewports: [320, 440, 600, 900] },
    layout: 'fullscreen',
  },
};

const Template = (args) => <Eyebrow {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Storybook Lazy Compilation for Webpack',
  link: 'https://storybook.js.org/blog/storybook-lazy-compilation-for-webpack/',
  githubStarCount: 73724,
};

export const Inverse = Template.bind({});
Inverse.args = { inverse: true, ...Default.args };
Inverse.parameters = {
  backgrounds: { default: 'dark' },
};
