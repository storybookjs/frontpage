import React from 'react';
import { FrameworkSupportTable } from './FrameworkSupportTable';

const frameworks = ['react', 'react-ts', 'vue', 'angular'];
const featureGroups = [
  {
    name: 'Group',
    features: [
      {
        name: 'Actions',
        unsupported: [],
        path: '/essentials/actions',
      },
      // These are just for testing purposes, please fill in with real values
      {
        name: 'Viewports',
        unsupported: ['vue'],
        path: '/essentials/viewports',
      },
      {
        name: 'Backgrounds',
        supported: ['react'],
        path: '/essentials/backgrounds',
      },
    ],
  },
];

export default {
  title: 'Frontpage|screens/DocsScreen/FrameworkSupportTable',
  component: FrameworkSupportTable,
};

const Template = (args) => <FrameworkSupportTable {...args} />;

export const Simple = Template.bind({});
Simple.args = { frameworks, featureGroups, currentFramework: frameworks[0] };
