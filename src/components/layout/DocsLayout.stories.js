import React from 'react';

import DocsLayout from './DocsLayout';

export const data = {
  currentPage: {
    fields: { slug: '/slug' },
  },
};

export const pageContext = {
  docsToc: [
    {
      title: 'Get Started',
      pathSegment: 'get-started',
      type: 'menu',
      children: [
        {
          pathSegment: 'introduction',
          path: '/get-started/introduction/',
          title: 'Introduction',
          type: 'bullet-link',
        },
        {
          pathSegment: 'install',
          path: '/get-started/install/',
          title: 'Install',
          type: 'bullet-link',
          description: 'Install the Storybook package in your project',
        },
      ],
    },
  ],
};

export default {
  title: 'Frontpage|layout/DocsLayout',
  component: DocsLayout,
  excludeStories: ['data', 'pageContext'],
};

export const Base = () => (
  <DocsLayout data={data} pageContext={pageContext}>
    children
  </DocsLayout>
);
