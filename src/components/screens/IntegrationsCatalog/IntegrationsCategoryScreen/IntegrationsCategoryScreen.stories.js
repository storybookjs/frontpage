import React from 'react';
import { IntegrationsCategoryScreen } from './IntegrationsCategoryScreen';
import { addonItemsData } from '../../../layout/integrations/addons/AddonsGrid.stories';
import { recipeItemsData } from '../../../layout/integrations/recipes/RecipesList.stories';
import { UseAddonsSearchDecorator } from '../../../../../.storybook/use-addons-search.mock';

export default {
  title: 'Integrations Catalog/Screens/CategoryScreen',
  component: IntegrationsCategoryScreen,
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
  <IntegrationsCategoryScreen pageContext={pageContext} location={{}} {...args} />
);

export const Default = {
  render: Template,

  args: {
    pageContext: {
      ...pageContext,
    },
  },

  parameters: {
    isSearching: false,
    isSearchLoading: false,
  },
};

export const WithDesc = {
  render: Template,

  args: {
    pageContext: {
      ...pageContext,
      category: 'Essentials',
      description: 'Pre-installed integrations that power the core Storybook experience',
    },
  },

  parameters: {
    isSearching: false,
    isSearchLoading: false,
  },
};

export const SearchLoading = {
  render: Template,
  args: { ...WithDesc.args },

  parameters: {
    isSearching: true,
    isSearchLoading: true,
  },
};

export const SearchResults = {
  render: Template,
  args: { ...WithDesc.args },

  parameters: {
    isSearching: true,
    isSearchLoading: false,
  },
};

export const SearchNoResults = {
  render: Template,
  args: { ...WithDesc.args },

  parameters: {
    isSearching: true,
    isSearchLoading: false,
    noResults: true,
  },
};
