import React from 'react';
import { ButtonToggle } from '@storybook/design-system';
import { AddonsGrid } from './AddonsGrid';
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

export default {
  title: 'Frontpage|layout/addons/AddonsGrid',
  component: AddonsGrid,
  excludeStories: /.*Data$/,
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

export const addonItemsData = [
  {
    id: '0',
    appearance: 'official',
    icon: ControlsSVG,
    displayName: 'Controls',
    name: '@storybook/addon-controls',
    description: 'Interact with component inputs dynamically in the Storybook UI',
    weeklyDownloads: 17143,
    authors,
  },
  {
    id: '1',
    icon: ViewportSVG,
    appearance: 'community',
    displayName: 'Mobile UX Hints',
    name: 'storybook-mobile',
    description:
      'Suggestions on how to tweak the HTML and CSS of your components to be more mobile-friendly.',
    weeklyDownloads: 12253,
    authors,
  },
  {
    id: '2',
    appearance: 'integrators',
    verifiedCreator: 'Contrast',
    icon: ContrastPNG,
    displayName: 'Contrast',
    name: 'storybook-contrast',
    description: 'Embed Contrast handoff tool in a storybook panel',
    weeklyDownloads: 3892,
    authors,
  },
  {
    id: '3',
    appearance: 'official',
    icon: AccessibilitySVG,
    displayName: 'Accessibility',
    name: '@storybook/addon-a11y',
    description: 'Test component compliance with web accessibility standards',
    weeklyDownloads: 923,
    authors: authors.slice(2, 3),
  },
  {
    id: '4',
    appearance: 'official',
    icon: ActionsSVG,
    displayName: 'Actions',
    name: '@storybook/addon-actions',
    description: 'Get UI feedback when an action is performed on an interactive element',
    weeklyDownloads: 8374,
    authors: authors.slice(0, 1),
  },
  {
    id: '5',
    appearance: 'official',
    icon: BackgroundsSVG,
    displayName: 'Backgrounds',
    name: '@storybook/addon-backgrounds',
    description: 'Switch backgrounds to view components in different settings',
    weeklyDownloads: 234,
    authors: authors.slice(0, 2),
  },
  {
    id: '6',
    appearance: 'official',
    icon: ConsoleSVG,
    displayName: 'Console',
    name: '@storybook/addon-console',
    description: 'Show console output like logs, errors, and warnings in the Storybook',
    weeklyDownloads: 343,
    authors: authors.slice(1, 2),
  },
  {
    id: '7',
    icon: CustomSVG,
    displayName: 'Controls',
    name: '@storybook/addon-controls',
    description: 'Interact with component inputs dynamically in the Storybook UI',
    weeklyDownloads: 12,
    authors: authors.slice(1, 2),
  },
  {
    id: '8',
    appearance: 'integrators',
    verifiedCreator: 'InVision',
    icon: DocsSVG,
    displayName: 'Docs',
    description: 'Document component usage and properties in Markdown',
    weeklyDownloads: 72936,
    authors: authors.slice(1, 3),
  },
  {
    id: '9',
    icon: LinksSVG,
    displayName: 'Links',
    name: '@storybook/addon-links',
    description: 'Link stories together to build demos and prototypes with your UI components',
    weeklyDownloads: 1734143,
    authors,
  },
  {
    id: '10',
    icon: OutlineSVG,
    displayName: 'Outline',
    name: 'storybook-addon-outline',
    description: 'Outline all elements with CSS to help with layout placement and alignment',
    weeklyDownloads: 294,
    authors: authors.slice(0, 1),
  },
  {
    id: '11',
    icon: SourceSVG,
    displayName: 'Source',
    name: '@storybook/addon-storysource',
    description: 'View a story’s source code to see how it works and paste into your app.',
    weeklyDownloads: 3827,
    authors,
  },
  {
    id: '12',
    appearance: 'integrators',
    verifiedCreator: 'Someone',
    icon: StoryshotsSVG,
    displayName: 'Storyshots',
    name: '@storybook/addon-storyshots',
    description: 'Take a code snapshot of every story automatically with Jest',
    weeklyDownloads: 5643,
    authors,
  },
  {
    id: '13',
    appearance: 'official',
    icon: ToolbarsSVG,
    displayName: 'Toolbars',
    name: '@storybook/addon-toolbars',
    description: 'Create your own toolbar items that control story rendering',
    weeklyDownloads: 8473,
    authors,
  },
];

const Template = (args) => <AddonsGrid {...args} />;

export const Default = Template.bind({});
Default.args = {
  addonItems: addonItemsData,
  title: 'Trending',
};

export const WithActions = Template.bind({});
WithActions.args = {
  addonItems: addonItemsData,
  title: 'Popular',
  actions: (
    <ButtonToggle
      selectedIndex={0}
      onSelectIndex={() => {}}
      titles={[
        { title: 'Month', tooltip: 'Month' },
        { title: 'Year', tooltip: 'Year' },
      ]}
    />
  ),
};
