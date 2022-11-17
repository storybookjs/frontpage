import React from 'react';
import { AddonsCategoryScreen } from './AddonsCategoryScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';
import { recipeItemsData } from '../../layout/recipes/RecipesList.stories';

export default {
  title: 'Integrations Catalog/Screens/Category',
  component: AddonsCategoryScreen,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
    pageLayout: {
      path: '/integrations',
    },
  },
};

const integrations = {
  addons: addonItemsData.slice(0, 4),
  recipes: recipeItemsData.slice(0, 6),
};

export const Default = () => (
  <AddonsCategoryScreen pageContext={{ category: 'Data and state', integrations }} />
);

Default.parameters = {
  isSearching: false,
  isSearchLoading: false,
};

export const WithDesc = () => (
  <AddonsCategoryScreen
    pageContext={{
      category: 'Essentials',
      description: 'Pre-installed addons that power the core Storybook experience',
      integrations,
    }}
  />
);
