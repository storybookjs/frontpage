import React from 'react';
import { Header } from './Header';

export default {
  title: 'Frontpage|layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Storybook Lazy Compilation for Webpack',
  link: 'https://storybook.js.org/blog/storybook-lazy-compilation-for-webpack/',
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  inverse: true,
};
Inverse.parameters = {
  backgrounds: { default: 'dark' },
};
