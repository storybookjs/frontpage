import React from 'react';
import { IntegrationsPageHeader as IntegrationsPageHeaderComponent } from './IntegrationsPageHeader';

export default {
  title: 'Integrations Catalog/Layout/IntegrationsPageHeader',
  component: IntegrationsPageHeaderComponent,
};

export const Default = () => (
  <IntegrationsPageHeaderComponent
    title="Essentials"
    subtitle="Pre-installed integrations that power the core Storybook experience"
  />
);

export const Tag = () => (
  <IntegrationsPageHeaderComponent title="Essentials" subtitle="7 integrations" />
);
