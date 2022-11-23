import React from 'react';
import { AddonsPageHeader as AddonsPageHeaderComponent } from './AddonsPageHeader';

export default {
  title: 'Integrations Catalog/Layout/Addons/AddonsPageHeader',
  component: AddonsPageHeaderComponent,
};

export const Default = () => (
  <AddonsPageHeaderComponent
    title="Essentials"
    subtitle="Pre-installed integrations that power the core Storybook experience"
  />
);

export const Tag = () => <AddonsPageHeaderComponent title="Essentials" subtitle="7 integrations" />;
