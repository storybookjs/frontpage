import React from 'react';
import AddonsLayout from './AddonsLayout';
import { addonItemsData } from './AddonsGrid.stories';

export const data = {
  currentPage: {
    fields: { slug: '/addons/essentials/' },
  },
};

export const pageContext = {};

export default {
  title: 'Frontpage|layout/addons/AddonsLayout',
  component: AddonsLayout,
  excludeStories: ['data', 'pageContext'],
};

export const Base = () => (
  <AddonsLayout data={data} pageContext={pageContext}>
    children
  </AddonsLayout>
);

export const HideTableOfContents = () => (
  <AddonsLayout data={data} pageContext={pageContext} hideSidebar>
    children
  </AddonsLayout>
);

export const SearchLoading = () => (
  <AddonsLayout
    data={data}
    pageContext={pageContext}
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
    data={data}
    pageContext={pageContext}
    searchQuery="notes"
    searchResults={{ addons: addonItemsData, relatedTags }}
  >
    children
  </AddonsLayout>
);
