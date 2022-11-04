import React from 'react';
import { AddonsPageHeader as AddonsPageHeaderComponent } from './AddonsPageHeader';

export default {
  title: 'Integrations Catalog/Layout/Addons/AddonsPageHeader',
  component: AddonsPageHeaderComponent,
};

export const AddonsPageHeader = () => (
  <AddonsPageHeaderComponent
    title="Essentials"
    kicker="6 addons"
    subtitle="Pre-installed addons that power the core Storybook experience"
  />
);
