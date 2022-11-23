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

const Spacer = styled.div`
  margin-top: 30px;
`;

export const Base = () => <AddonsLayout currentPath="/addons/essentials/">children</AddonsLayout>;

export const HideTableOfContents = () => (
  <AddonsLayout currentPath="/addons/essentials/" hideSidebar>
    children
  </AddonsLayout>
);

export const SearchLoading = () => (
  <>
    <Spacer />
    <AddonsLayout currentPath="/addons/essentials/">children</AddonsLayout>
  </>
);
SearchLoading.parameters = {
  isSearching: true,
  isSearchLoading: true,
};

export const SearchResults = () => (
  <>
    <Spacer />
    <AddonsLayout currentPath="/addons/essentials/">children</AddonsLayout>
  </>
);
SearchResults.parameters = {
  isSearching: true,
  isSearchLoading: false,
};

export const SearchNoResults = () => (
  <>
    <Spacer />
    <AddonsLayout currentPath="/addons/essentials/">children</AddonsLayout>
  </>
);

SearchNoResults.parameters = {
  isSearching: true,
  isSearchLoading: false,
  noResults: true,
};
