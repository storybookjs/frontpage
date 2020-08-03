import React from 'react';
import { storiesOf } from '@storybook/react';

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
          // TODO: Update the description
          description: 'Install the Storybook package in your project',
        },
      ],
    },
  ],
};

storiesOf('Frontpage|layout/DocsLayout', module).add('default', () => (
  <DocsLayout data={data} pageContext={pageContext}>
    children
  </DocsLayout>
));
