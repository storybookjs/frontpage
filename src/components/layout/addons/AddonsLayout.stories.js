import React from 'react';
import seedrandom from 'seedrandom';
import { AddonsLayout } from './AddonsLayout';
import { addonItemsData } from './AddonsGrid.stories';

seedrandom('chromatic testing', { global: true });

export default {
  title: 'Frontpage|layout/addons/AddonsLayout',
  component: AddonsLayout,
  excludeStories: ['data'],
};

export const Base = () => <AddonsLayout currentPath="/addons/essentials/">children</AddonsLayout>;

export const HideTableOfContents = () => (
  <AddonsLayout currentPath="/addons/essentials/" hideSidebar>
    children
  </AddonsLayout>
);

export const SearchLoading = () => (
  <AddonsLayout
    currentPath="/addons/essentials/"
    searchQuery="notes"
    searchResults={{ addons: undefined, relatedTags: [] }}
  >
    children
  </AddonsLayout>
);

const relatedTags = [
  {
    link: '/notes',
    name: '🗒 Notes',
  },
  {
    link: '/storybook',
    name: '📕 Storybook',
  },
  {
    link: '/qa',
    name: '🕵️‍♀️ QA',
  },
  {
    link: '/prototype',
    name: '✨ Prototype',
  },
  {
    link: '/testing',
    name: '✅ Testing',
  },
  {
    link: '/deploy',
    name: '☁️ Deploy',
  },
];

export const SearchResults = () => (
  <AddonsLayout
    currentPath="/addons/essentials/"
    searchQuery="notes"
    searchResults={{ addons: addonItemsData, relatedTags }}
  >
    children
  </AddonsLayout>
);
