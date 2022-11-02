import React from 'react';
import { AddonsTagScreen } from './AddonsTagScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';
import { recipeItemsData } from '../../layout/recipes/RecipesList.stories';

export default {
  title: 'Integrations Catalog/Screens/Tag',
  component: AddonsTagScreen,
};

export const Tag = () => (
  <AddonsTagScreen
    pageContext={{
      tag: {
        name: 'notes',
        displayName: 'Notes',
        icon: '🗒️',
        integrations: {
          addons: addonItemsData,
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
  />
);
