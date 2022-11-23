import React from 'react';
import { AddonsHomeScreen as AddonsHomeScreenComponent } from './AddonsHomeScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';
import { recipeItemsData } from '../../layout/recipes/RecipesList.stories';
import { UseAddonsSearchDecorator } from '../../../../.storybook/use-addons-search.mock';

export default {
  title: 'Integrations Catalog/Screens/Home',
  component: AddonsHomeScreenComponent,
  decorators: [UseAddonsSearchDecorator],
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
    pageLayout: {
      pathname: '/integrations',
    },
  },
};

export const Home = () => (
  <AddonsHomeScreenComponent
    pageContext={{
      popularAddons: { MONTH: addonItemsData.slice(0, 6), YEAR: addonItemsData.slice(-9) },
      popularRecipes: { MONTH: recipeItemsData.slice(0, 3), YEAR: recipeItemsData.slice(0, 6) },
      trendingAddons: addonItemsData.slice(-9),
      trendingTags: [
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
    }}
  />
);
