import React from 'react';
import { RendererSupportTable } from './RendererSupportTable';

const renderers = ['react', 'vue', 'angular'];
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
  title: 'Screens/DocsScreen/RendererSupportTable',
  component: RendererSupportTable,
};

const Template = (args) => <RendererSupportTable {...args} />;

export const Simple = Template.bind({});
Simple.args = { renderers, featureGroups, currentRenderer: renderers[0] };
