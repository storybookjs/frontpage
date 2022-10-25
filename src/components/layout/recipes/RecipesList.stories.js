import React from 'react';
import { RecipesList } from './RecipesList';
import ControlsSVG from '../../../images/addon-catalog/controls.svg';
import ViewportSVG from '../../../images/addon-catalog/viewports.svg';
import ContrastPNG from '../../../images/addon-catalog/contrast.png';
import AccessibilitySVG from '../../../images/addon-catalog/accessibility.svg';
import ActionsSVG from '../../../images/addon-catalog/actions.svg';
import BackgroundsSVG from '../../../images/addon-catalog/backgrounds.svg';
import ConsoleSVG from '../../../images/addon-catalog/console.svg';
import CustomSVG from '../../../images/addon-catalog/custom.svg';
import DocsSVG from '../../../images/addon-catalog/docs.svg';
import LinksSVG from '../../../images/addon-catalog/links.svg';
import OutlineSVG from '../../../images/addon-catalog/outline.svg';
import SourceSVG from '../../../images/addon-catalog/source.svg';
import StoryshotsSVG from '../../../images/addon-catalog/storyshots.svg';
import ToolbarsSVG from '../../../images/addon-catalog/toolbars.svg';

export const recipeItemsData = [
  {
    id: '0',
    appearance: 'official',
    icon: ControlsSVG,
    displayName: 'Controls',
    name: '@storybook/addon-controls',
    description: 'Interact with component inputs dynamically in the Storybook UI',
    views: 17143,
  },
  {
    id: '1',
    icon: ViewportSVG,
    appearance: 'community',
    displayName: 'Mobile UX Hints',
    name: 'storybook-mobile',
    description:
      'Suggestions on how to tweak the HTML and CSS of your components to be more mobile-friendly.',
    views: 12253,
  },
  {
    id: '2',
    appearance: 'integrators',
    verifiedCreator: 'Contrast',
    icon: ContrastPNG,
    displayName: 'Contrast',
    name: 'storybook-contrast',
    description: 'Embed Contrast handoff tool in a storybook panel',
    views: 3892,
  },
  {
    id: '3',
    appearance: 'official',
    icon: AccessibilitySVG,
    displayName: 'Accessibility',
    name: '@storybook/addon-a11y',
    description: 'Test component compliance with web accessibility standards',
    views: 923,
  },
  {
    id: '4',
    appearance: 'official',
    icon: ActionsSVG,
    displayName: 'Actions',
    name: '@storybook/addon-actions',
    description: 'Get UI feedback when an action is performed on an interactive element',
    views: 8374,
  },
  {
    id: '5',
    appearance: 'official',
    icon: BackgroundsSVG,
    displayName: 'Backgrounds',
    name: '@storybook/addon-backgrounds',
    description: 'Switch backgrounds to view components in different settings',
    views: 234,
  },
  {
    id: '6',
    appearance: 'official',
    icon: ConsoleSVG,
    displayName: 'Console',
    name: '@storybook/addon-console',
    description: 'Show console output like logs, errors, and warnings in the Storybook',
    views: 343,
  },
  {
    id: '7',
    icon: CustomSVG,
    displayName: 'Controls',
    name: '@storybook/addon-controls',
    description: 'Interact with component inputs dynamically in the Storybook UI',
    views: 12,
  },
  {
    id: '8',
    appearance: 'integrators',
    verifiedCreator: 'InVision',
    icon: DocsSVG,
    displayName: 'Docs',
    description: 'Document component usage and properties in Markdown',
    views: 72936,
  },
  {
    id: '9',
    icon: LinksSVG,
    displayName: 'Links',
    name: '@storybook/addon-links',
    description: 'Link stories together to build demos and prototypes with your UI components',
    views: 1734143,
  },
  {
    id: '10',
    icon: OutlineSVG,
    displayName: 'Outline',
    name: 'storybook-addon-outline',
    description: 'Outline all elements with CSS to help with layout placement and alignment',
    views: 294,
  },
  {
    id: '11',
    icon: SourceSVG,
    displayName: 'Source',
    name: '@storybook/addon-storysource',
    description: 'View a story’s source code to see how it works and paste into your app.',
    views: 3827,
  },
  {
    id: '12',
    appearance: 'integrators',
    verifiedCreator: 'Someone',
    icon: StoryshotsSVG,
    displayName: 'Storyshots',
    name: '@storybook/addon-storyshots',
    description: 'Take a code snapshot of every story automatically with Jest',
    views: 5643,
  },
  {
    id: '13',
    appearance: 'official',
    icon: ToolbarsSVG,
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
