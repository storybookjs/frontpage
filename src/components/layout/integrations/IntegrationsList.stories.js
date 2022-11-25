import React from 'react';
import { IntegrationsList } from './IntegrationsList';

import { addonItemsData } from './addons/AddonsGrid.stories';
import { recipeItemsData } from './recipes/RecipesList.stories';

export const IntegrationItemsData = [...addonItemsData.slice(0, 5), ...recipeItemsData.slice(0, 5)];

export default {
  title: 'Integrations Catalog/Layout/IntegrationsList',
  component: IntegrationsList,
  excludeStories: /.*Data$/,
  parameters: {
    chromatic: { viewports: [320, 900] },
  },
};

const Template = (args) => <IntegrationsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  integrationItems: IntegrationItemsData.slice(0, 5),
};

export const LoadMore = Template.bind({});
LoadMore.args = {
  integrationItems: IntegrationItemsData,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
