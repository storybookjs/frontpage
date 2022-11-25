import React from 'react';
import seedrandom from 'seedrandom';

import { IntegrationsLayout } from './IntegrationsLayout';
import { UseAddonsSearchDecorator } from '../../../../.storybook/use-addons-search.mock';

seedrandom('chromatic testing', { global: true });

export default {
  title: 'Integrations Catalog/Layout/IntegrationsLayout',
  component: IntegrationsLayout,
  excludeStories: ['data'],
  decorators: [UseAddonsSearchDecorator],
  parameters: {
    pageLayout: {
      path: '/integrations',
    },
  },
};

export const Base = () => (
  <IntegrationsLayout currentPath="/addons/essentials/">children</IntegrationsLayout>
);

export const HideTableOfContents = () => (
  <IntegrationsLayout currentPath="/addons/essentials/" hideSidebar>
    children
  </IntegrationsLayout>
);
