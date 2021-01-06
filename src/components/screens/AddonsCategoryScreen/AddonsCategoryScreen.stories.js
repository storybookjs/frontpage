import React from 'react';
import { AddonsCategoryScreen } from './AddonsCategoryScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';

export default {
  title: 'Frontpage|screens/AddonsCategoryScreen',
  component: AddonsCategoryScreen,
};

export const Default = () => (
  <AddonsCategoryScreen pageContext={{ category: 'Data and state', addons: addonItemsData }} />
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
      addons: addonItemsData,
    }}
  />
);
