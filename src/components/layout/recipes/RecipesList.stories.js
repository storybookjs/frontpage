import React from 'react';
import { RecipesList } from './RecipesList';
import NextJsSVG from '../../../images/integrations/nextjs.svg';
import MuiSVG from '../../../images/integrations/mui.svg';
import I18nextSVG from '../../../images/integrations/i18next.svg';

export const recipeItemsData = [
  {
    id: '0',
    displayName: 'Next.js',
    icon: NextJsSVG,
    name: 'next',
    description: 'A low config way to get your Next.js UI working in Storybook',
    views: 17143,
  },
  {
    id: '1',
    displayName: 'Material UI',
    icon: MuiSVG,
    name: '@mui/material',
    description: 'Get the most out of Material UI in your Storybook',
    views: 12253,
  },
  {
    id: '2',
    displayName: 'React i18next',
    icon: I18nextSVG,
    name: 'react-i18next',
    description: 'Internationalization support for Storybook with toolbar locale toggle',
    views: 3892,
  },
  {
    id: '3',
    displayName: 'Accessibility',
    name: '@storybook/addon-a11y',
    description: 'Test component compliance with web accessibility standards',
    views: 923,
  },
  {
    id: '4',
    displayName: 'Actions',
    name: '@storybook/addon-actions',
    description: 'Get UI feedback when an action is performed on an interactive element',
    views: 8374,
  },
  {
    id: '5',
    displayName: 'Backgrounds',
    name: '@storybook/addon-backgrounds',
    description: 'Switch backgrounds to view components in different settings',
    views: 234,
  },
  {
    id: '6',
    displayName: 'Console',
    name: '@storybook/addon-console',
    description: 'Show console output like logs, errors, and warnings in the Storybook',
    views: 343,
  },
  {
    id: '7',
    displayName: 'Controls',
    name: '@storybook/addon-controls',
    description: 'Interact with component inputs dynamically in the Storybook UI',
    views: 12,
  },
  {
    id: '8',
    displayName: 'Docs',
    description: 'Document component usage and properties in Markdown',
    views: 72936,
  },
  {
    id: '9',
    displayName: 'Links',
    name: '@storybook/addon-links',
    description: 'Link stories together to build demos and prototypes with your UI components',
    views: 1734143,
  },
  {
    id: '10',
    displayName: 'Outline',
    name: 'storybook-addon-outline',
    description: 'Outline all elements with CSS to help with layout placement and alignment',
    views: 294,
  },
  {
    id: '11',
    displayName: 'Source',
    name: '@storybook/addon-storysource',
    description: 'View a story’s source code to see how it works and paste into your app.',
    views: 3827,
  },
  {
    id: '12',
    displayName: 'Storyshots',
    name: '@storybook/addon-storyshots',
    description: 'Take a code snapshot of every story automatically with Jest',
    views: 5643,
  },
  {
    id: '13',
    displayName: 'Toolbars',
    name: '@storybook/addon-toolbars',
    description: 'Create your own toolbar items that control story rendering',
    views: 8473,
  },
];

export default {
  title: 'Frontpage|layout/Recipes/RecipesList',
  component: RecipesList,
  excludeStories: /.*Data$/,
};

const Template = (args) => <RecipesList {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Popular recipes',
  recipeItems: recipeItemsData.slice(0, 5),
};

export const LoadMore = Template.bind({});
LoadMore.args = {
  title: 'Popular recipes',
  recipeItems: recipeItemsData,
};

export const Loading = Template.bind({});
Loading.args = {
  title: 'Popular recipes',
  isLoading: true,
};
