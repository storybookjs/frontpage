import React from 'react';
import { IntegrationsCatalogHomeScreen as IntegrationsCatalogHomeScreenComponent } from './IntegrationsCatalogHomeScreen';
import { addonItemsData } from '../../../layout/integrations/addons/AddonsGrid.stories';
import { recipeItemsData } from '../../../layout/integrations/recipes/RecipesList.stories';
import { UseAddonsSearchDecorator } from '../../../../../.storybook/use-addons-search.mock';

export default {
  title: 'Integrations Catalog/Screens/HomeScreen',
  component: IntegrationsCatalogHomeScreenComponent,
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
  <IntegrationsCatalogHomeScreenComponent
    pageContext={{
      popularAddons: addonItemsData.slice(0, 6),
      popularRecipes: recipeItemsData.slice(0, 3),
      trendingTags: [
        {
          link: '/notes',
          name: 'notes',
          displayName: 'Notes',
          icon: '🗒',
        },
        {
          link: '/storybook',
          name: 'storybook',
          displayName: 'Storybook',
          icon: '📕',
        },
        {
          link: '/qa',
          name: 'qa',
          displayName: 'QA',
          icon: '🕵️‍♀️',
        },
        {
          link: '/prototype',
          name: 'prototype',
          displayName: 'Prototype',
          icon: '✨',
        },
        {
          link: '/testing',
          name: 'testing',
          displayName: 'Testing',
          icon: '✅',
        },
        {
          link: '/deploy',
          name: 'deploy',
          displayName: 'Deploy',
          icon: '☁️',
        },
      ],
      vta: {
        type: 'Addon',
        id: 'addon_0',
        appearance: 'official',
        icon: 'https://github.com/chromaui/addon-visual-tests/assets/486540/9acf6f3f-eadb-4b9e-b934-c4b0f87d9430',
        displayName: 'Visual Tests',
        name: '@chromatic-com/storybook',
        description: 'Catch unexpected visual changes & UI bugs in your stories',
        weeklyDownloads: 65132,
        authors: addonItemsData[0].authors,
      },
    }}
  />
);

export const Default = {
  render: Template,
};

export const SearchLoading = {
  render: Template,

  parameters: {
    isSearching: true,
    isSearchLoading: true,
  },
};

export const SearchResults = {
  render: Template,

  parameters: {
    isSearching: true,
    isSearchLoading: false,
  },
};

export const SearchNoResults = {
  render: Template,

  parameters: {
    isSearching: true,
    isSearchLoading: false,
    noResults: true,
  },
};
