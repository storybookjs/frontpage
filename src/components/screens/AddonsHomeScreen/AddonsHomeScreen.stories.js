import React from 'react';
import { AddonsHomeScreen as AddonsHomeScreenComponent } from './AddonsHomeScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';

export default {
  title: 'Integrations Catalog/Screens/Home',
  component: AddonsHomeScreenComponent,
};

export const Home = () => (
  <AddonsHomeScreenComponent
    pageContext={{
      popularAddons: { MONTH: addonItemsData.slice(0, 9), YEAR: addonItemsData.slice(-9) },
      trendingAddons: addonItemsData.slice(-9),
    }}
  />
);
