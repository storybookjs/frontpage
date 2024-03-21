import React from 'react';
import { AddonsList } from './AddonsList';
import { addonItemsData } from './AddonsGrid.stories';

export default {
  title: 'Integrations Catalog/Layout/Addons/AddonsList',
  component: AddonsList,
  excludeStories: /.*Data$/,
};

export const Default = {
  args: {
    addonItems: addonItemsData.slice(0, 5),
  },
};

export const LoadMore = {
  args: {
    addonItems: addonItemsData,
  },
};

export const Loading = {
  args: {
    isLoading: true,
  },
};
