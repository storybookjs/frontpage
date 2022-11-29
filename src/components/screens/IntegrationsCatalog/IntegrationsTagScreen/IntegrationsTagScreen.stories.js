import React from 'react';
import { IntegrationsTagScreen } from './IntegrationsTagScreen';
import { addonItemsData } from '../../../layout/integrations/addons/AddonsGrid.stories';
import { recipeItemsData } from '../../../layout/integrations/recipes/RecipesList.stories';
import { UseAddonsSearchDecorator } from '../../../../../.storybook/use-addons-search.mock';

export default {
  title: 'Integrations Catalog/Screens/TagScreen',
  component: IntegrationsTagScreen,
  decorators: [UseAddonsSearchDecorator],
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
    pageLayout: {
      pathname: '/integrations',
    },
  },
};

const Template = () => (
  <IntegrationsTagScreen
    pageContext={{
      tag: {
        name: 'notes',
        displayName: 'Notes',
        icon: '🗒️',
        integrations: {
          addons: addonItemsData.slice(0, 4),
          recipes: recipeItemsData.slice(0, 3),
        },
        relatedTags: [
          {
            link: '/notes',
            displayName: 'Notes',
            icon: '🗒',
            name: 'notes',
          },
          {
            link: '/storybook',
            displayName: 'Storybook',
            icon: '📕',
            name: 'storybook',
          },
          {
            link: '/qa',
            displayName: 'QA',
            icon: '🕵️‍♀️',
            name: 'qa',
          },
          {
            link: '/prototype',
            displayName: 'Prototype',
            icon: '✨',
            name: 'prototype',
          },
          {
            link: '/testing',
            displayName: 'Testing',
            icon: '✅',
            name: 'testing',
          },
          {
            link: '/deploy',
            displayName: 'Deploy',
            icon: '☁️',
            name: 'deploy',
          },
        ],
      },
    }}
    location={{}}
  />
);

export const Default = Template.bind({});
