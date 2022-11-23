import React from 'react';
import { AddonsTagScreen } from './AddonsTagScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';
import { recipeItemsData } from '../../layout/recipes/RecipesList.stories';
import { UseAddonsSearchDecorator } from '../../../../.storybook/use-addons-search.mock';

export default {
  title: 'Integrations Catalog/Screens/Tag',
  component: AddonsTagScreen,
  decorators: [UseAddonsSearchDecorator],
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
  pageLayout: {
    path: '/integrations',
  },
};

export const Tag = () => (
  <AddonsTagScreen
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
          },
          {
            link: '/storybook',
            displayName: 'Storybook',
            icon: '📕',
          },
          {
            link: '/qa',
            displayName: 'QA',
            icon: '🕵️‍♀️',
          },
          {
            link: '/prototype',
            displayName: 'Prototype',
            icon: '✨',
          },
          {
            link: '/testing',
            displayName: 'Testing',
            icon: '✅',
          },
          {
            link: '/deploy',
            displayName: 'Deploy',
            icon: '☁️',
          },
        ],
      },
    }}
    location={{}}
  />
);
