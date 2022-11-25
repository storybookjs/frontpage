import React from 'react';
import seedrandom from 'seedrandom';
import { styled } from '@storybook/theming';

import { AddonsLayout } from './AddonsLayout';
import { UseAddonsSearchDecorator } from '../../../../.storybook/use-addons-search.mock';

seedrandom('chromatic testing', { global: true });

export default {
  title: 'Integrations Catalog/Layout/Addons/AddonsLayout',
  component: AddonsLayout,
  excludeStories: ['data'],
  decorators: [UseAddonsSearchDecorator],
  parameters: {
    pageLayout: {
      path: '/integrations',
    },
  },
};

export const Base = () => <AddonsLayout currentPath="/addons/essentials/">children</AddonsLayout>;

export const HideTableOfContents = () => (
  <AddonsLayout currentPath="/addons/essentials/" hideSidebar>
    children
  </AddonsLayout>
);
