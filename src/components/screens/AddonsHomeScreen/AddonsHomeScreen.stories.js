import React from 'react';
import { AddonsHomeScreen as AddonsHomeScreenComponent } from './AddonsHomeScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';
import { recipeItemsData } from '../../layout/recipes/RecipesList.stories';

export default {
  title: 'Integrations Catalog/Screens/Home',
  component: AddonsHomeScreenComponent,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

export const Home = () => (
  <AddonsHomeScreenComponent
    pageContext={{
      popularAddons: { MONTH: addonItemsData.slice(0, 6), YEAR: addonItemsData.slice(-9) },
      popularRecipes: { MONTH: recipeItemsData.slice(0, 3), YEAR: recipeItemsData.slice(0, 6) },
      trendingAddons: addonItemsData.slice(-9),
    }}
  />
);
