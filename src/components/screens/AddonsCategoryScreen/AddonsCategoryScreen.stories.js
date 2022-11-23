import React from 'react';
import { AddonsCategoryScreen } from './AddonsCategoryScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';
import { recipeItemsData } from '../../layout/recipes/RecipesList.stories';
import { UseAddonsSearchDecorator } from '../../../../.storybook/use-addons-search.mock';

export default {
  title: 'Integrations Catalog/Screens/CategoryScreen',
  component: AddonsCategoryScreen,
  decorators: [UseAddonsSearchDecorator],
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
    pageLayout: {
      pathname: '/integrations',
    },
  },
};

const integrations = {
  addons: addonItemsData.slice(0, 4),
  recipes: recipeItemsData.slice(0, 6),
};

export const Default = () => (
  <AddonsCategoryScreen pageContext={{ category: 'Data and state', integrations }} location={{}} />
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
    location={{}}
  />
);
