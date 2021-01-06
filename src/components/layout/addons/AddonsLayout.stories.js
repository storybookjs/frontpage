import React from 'react';
import seedrandom from 'seedrandom';
import { AddonsLayout } from './AddonsLayout';
import { UseAddonsSearchDecorator } from '../../../../.storybook/use-addons-search.mock';

seedrandom('chromatic testing', { global: true });

export default {
  title: 'Frontpage|layout/addons/AddonsLayout',
  component: AddonsLayout,
  excludeStories: ['data'],
  decorators: [UseAddonsSearchDecorator],
};

export const Base = () => <AddonsLayout currentPath="/addons/essentials/">children</AddonsLayout>;

export const HideTableOfContents = () => (
  <AddonsLayout currentPath="/addons/essentials/" hideSidebar>
    children
  </AddonsLayout>
);

export const SearchLoading = () => (
  <AddonsLayout currentPath="/addons/essentials/">children</AddonsLayout>
);

SearchLoading.parameters = {
  isSearching: true,
  isSearchLoading: true,
};

export const SearchResults = () => (
  <AddonsLayout currentPath="/addons/essentials/">children</AddonsLayout>
);

SearchResults.parameters = {
  isSearching: true,
  isSearchLoading: false,
};

export const SearchNoResults = () => (
  <AddonsLayout currentPath="/addons/essentials/">children</AddonsLayout>
);

SearchNoResults.parameters = {
  isSearching: true,
  isSearchLoading: false,
  noResults: true,
};
