import React from 'react';
import { RecipesList } from './RecipesList';
import MuiSVG from '../../../images/addon-catalog/recipes/@mui/material.svg';
import I18nextSVG from '../../../images/addon-catalog/recipes/react-i18next.svg';
import NextJsSVG from '../../../images/addon-catalog/recipes/nextjs.svg';

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

export const recipeItemsData = [
  {
    type: 'Recipe',
    id: '0',
    displayName: 'Material UI',
    icon: MuiSVG,
    accentColor: '#000',
    name: '@mui/material',
    description: "Material UI is component library styled based on Google's Material Design spec",
    views: 12253,
    authors,
  },
  {
    type: 'Recipe',
    id: '1',
    displayName: 'React i18next',
    icon: I18nextSVG,
    accentColor: '#80cac3',
    name: 'react-i18next',
    description: 'Internationalization support for Storybook with toolbar locale toggle',
    views: 3892,
    authors: authors.slice(0, 1),
  },
  {
    type: 'Recipe',
    id: '2',
    displayName: 'Next.js',
    icon: NextJsSVG,
    accentColor: '#000',
    name: 'next',
    description: 'A low config way to get your Next.js UI working in Storybook',
    views: 17143,
    authors: authors.slice(2, 3),
  },
  {
    type: 'Recipe',
    id: '3',
    displayName: 'Accessibility',
    name: '@storybook/addon-a11y',
    description: 'Test component compliance with web accessibility standards',
    views: 923,
    authors,
  },
  {
    type: 'Recipe',
    id: '4',
    displayName: 'Actions',
    name: '@storybook/addon-actions',
    description: 'Get UI feedback when an action is performed on an interactive element',
    views: 8374,
    authors,
  },
  {
    type: 'Recipe',
    id: '5',
    displayName: 'Backgrounds',
    name: '@storybook/addon-backgrounds',
    description: 'Switch backgrounds to view components in different settings',
    views: 234,
    authors,
  },
  {
    type: 'Recipe',
    id: '6',
    displayName: 'Console',
    name: '@storybook/addon-console',
    description: 'Show console output like logs, errors, and warnings in the Storybook',
    views: 343,
    authors: authors.slice(0, 2),
  },
  {
    type: 'Recipe',
    id: '7',
    displayName: 'Controls',
    name: '@storybook/addon-controls',
    description: 'Interact with component inputs dynamically in the Storybook UI',
    views: 12,
    authors,
  },
  {
    type: 'Recipe',
    id: '8',
    displayName: 'Docs',
    description: 'Document component usage and properties in Markdown',
    views: 72936,
    authors,
  },
  {
    type: 'Recipe',
    id: '9',
    displayName: 'Links',
    name: '@storybook/addon-links',
    description: 'Link stories together to build demos and prototypes with your UI components',
    views: 1734143,
    authors,
  },
  {
    type: 'Recipe',
    id: '10',
    displayName: 'Outline',
    name: 'storybook-addon-outline',
    description: 'Outline all elements with CSS to help with layout placement and alignment',
    views: 294,
    authors,
  },
  {
    type: 'Recipe',
    id: '11',
    displayName: 'Source',
    name: '@storybook/addon-storysource',
    description: 'View a story’s source code to see how it works and paste into your app.',
    views: 3827,
    authors,
  },
  {
    type: 'Recipe',
    id: '12',
    displayName: 'Storyshots',
    name: '@storybook/addon-storyshots',
    description: 'Take a code snapshot of every story automatically with Jest',
    views: 5643,
    authors,
  },
  {
    type: 'Recipe',
    id: '13',
    displayName: 'Toolbars',
    name: '@storybook/addon-toolbars',
    description: 'Create your own toolbar items that control story rendering',
    views: 8473,
    authors,
  },
];

export default {
  title: 'Integrations Catalog/Layout/Recipes/RecipesList',
  component: RecipesList,
  excludeStories: /.*Data$/,
  parameters: {
    chromatic: { viewports: [320, 900] },
  },
};

const Template = (args) => <RecipesList {...args} />;

export const Default = Template.bind({});
Default.args = {
  recipeItems: recipeItemsData.slice(0, 5),
};

export const LoadMore = Template.bind({});
LoadMore.args = {
  recipeItems: recipeItemsData,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
