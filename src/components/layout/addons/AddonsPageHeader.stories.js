import React from 'react';
import { AddonsPageHeader } from './AddonsPageHeader';
import { addonItemsData } from './AddonsGrid.stories';

export default {
  title: 'Frontpage|layout/addons/AddonsPageHeader',
  component: AddonsPageHeader,
};

export const Default = () => (
  <AddonsPageHeader
    title="Essentials"
    kicker="6 addons"
    subtitle="Pre-installed addons that power the core Storybook experience"
  />
);
