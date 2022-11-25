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

const pageContext = {
  category: 'Data and state',
  integrations,
};

const Template = (args) => (
  <AddonsCategoryScreen pageContext={pageContext} location={{}} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  pageContext: {
    ...pageContext,
  },
};
Default.parameters = {
  isSearching: false,
  isSearchLoading: false,
};

export const WithDesc = Template.bind({});
WithDesc.args = {
  pageContext: {
    ...pageContext,
    category: 'Essentials',
    description: 'Pre-installed integrations that power the core Storybook experience',
  },
};
WithDesc.parameters = {
  isSearching: false,
  isSearchLoading: false,
};

export const SearchLoading = Template.bind({});
SearchLoading.args = { ...WithDesc.args };
SearchLoading.parameters = {
  isSearching: true,
  isSearchLoading: true,
};

export const SearchResults = Template.bind({});
SearchResults.args = { ...WithDesc.args };
SearchResults.parameters = {
  isSearching: true,
  isSearchLoading: false,
};

export const SearchNoResults = Template.bind({});
SearchNoResults.args = { ...WithDesc.args };
SearchNoResults.parameters = {
  isSearching: true,
  isSearchLoading: false,
  noResults: true,
};
