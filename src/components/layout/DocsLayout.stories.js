import React from 'react';

import DocsLayout from './DocsLayout';

export const data = {
  currentPage: {
    fields: { slug: '/introduction/' },
  },
};

const docsToc = [
  {
    title: 'Get Started',
    type: 'menu',
    children: [
      {
        path: '/introduction/',
        title: 'Introduction',
        type: 'bullet-link',
      },
      {
        path: '/install/',
        title: 'Install',
        type: 'bullet-link',
        description: 'Install the Storybook package in your project',
      },
      {
        path: '/whats-a-story/',
        title: "What's a story?",
        type: 'bullet-link',
        description: 'Learn the base construct of stories within Storybook',
      },
      {
        path: '/browse-stories/',
        title: 'Browse stories',
        type: 'bullet-link',
        description: 'Learn how to explore your stories within Storybook',
      },
      {
        path: '/setup/',
        title: 'Setup',
        type: 'bullet-link',
        description: 'Write your first story & adjust Storybook configuration for your environment',
      },
      {
        path: '/conclusion/',
        title: 'Conclusion',
        type: 'bullet-link',
        description: 'Take your Storybook skills to the next level',
      },
    ],
  },
  {
    title: 'Writing Stories',
    path: '/writing-stories/',
    type: 'menu',
    children: [
      {
        path: '/stories-introduction/',
        title: 'Introduction',
        type: 'link',
      },
      {
        path: '/args/',
        title: 'Args',
        type: 'link',
      },
      {
        path: '/parameters/',
        title: 'Parameters',
        type: 'link',
      },
      {
        path: '/decorators/',
        title: 'Decorators',
        type: 'link',
      },
      {
        path: '/naming-components-and-hierarchy/',
        title: 'Naming components and hierarchy',
        type: 'link',
      },
    ],
  },
  {
    title: 'Writing Docs',
    path: '/writing-docs/',
    type: 'menu',
    children: [
      {
        path: '/docs-introduction/',
        title: 'Introduction',
        type: 'link',
      },
      {
        path: '/docs-page/',
        title: 'Docs Page',
        type: 'link',
      },
      {
        path: '/mdx/',
        title: 'MDX',
        type: 'link',
      },
      {
        path: '/doc-blocks/',
        title: 'Docs Blocks',
        type: 'link',
      },
    ],
  },
  {
    title: 'Essentials',
    path: '/essentials/',
    type: 'menu',
    children: [
      {
        path: '/introduction/',
        title: 'Introduction',
        type: 'link',
      },
      {
        path: '/controls/',
        title: 'Controls',
        type: 'link',
      },
      {
        path: '/actions/',
        title: 'Actions',
        type: 'link',
      },
      {
        path: '/viewports/',
        title: 'Viewports',
        type: 'link',
      },
      {
        path: '/backgrounds/',
        title: 'Backgrounds',
        type: 'link',
      },
      {
        path: '/toolbars-and-globals/',
        title: 'Toolbars & globals',
        type: 'link',
      },
    ],
  },
  {
    title: 'Configure',
    path: '/configure/',
    type: 'menu',
    children: [
      {
        path: '/overview/',
        title: 'Overview',
        type: 'link',
      },
      {
        path: '/integration/',
        title: 'Integration',
        type: 'link',
      },
      {
        path: '/story-rendering/',
        title: 'Story rendering',
        type: 'link',
      },
      {
        path: '/user-interface/',
        title: 'User interface',
        type: 'link',
      },
    ],
  },
  {
    title: 'Workflows',
    path: '/workflows/',
    type: 'menu',
    children: [
      {
        path: '/publish-storybook/',
        title: 'Publish Storybook',
        type: 'link',
      },
      {
        path: '/build-pages-with-storybook/',
        title: 'Building pages with Storybook',
        type: 'link',
      },
      {
        path: '/stories-for-multiple-components/',
        title: 'Stories for multiple components',
        type: 'link',
      },
      {
        title: 'Testing with Storybook',
        // Despite having a child menu, this does not currently affect the path
        path: '//',
        type: 'menu',
        children: [
          {
            path: '/testing-with-storybook/',
            title: 'Introduction',
            type: 'link',
          },
          {
            path: '/unit-testing/',
            title: 'Unit testing',
            type: 'link',
          },
          {
            path: '/visual-testing/',
            title: 'Visual testing',
            type: 'link',
          },
          {
            path: '/interaction-testing/',
            title: 'Interaction testing',
            type: 'link',
          },
          {
            path: '/snapshot-testing/',
            title: 'Snapshot testing',
            type: 'link',
          },
        ],
      },
      {
        path: '/storybook-composition/',
        title: 'Storybook Composition',
        type: 'link',
      },
      {
        path: '/package-composition/',
        title: 'Package Composition',
        type: 'link',
      },
    ],
  },
  {
    title: 'API',
    path: '/api/',
    type: 'menu',
    children: [
      {
        path: '/stories/',
        title: 'Stories',
        type: 'link',
      },
      {
        path: '/addons/',
        title: 'Addons',
        type: 'link',
      },
      {
        path: '/new-frameworks/',
        title: 'Frameworks',
        type: 'link',
      },
      {
        path: '/cli-options/',
        title: 'CLI Options',
        type: 'link',
      },
      {
        path: '/frameworks-feature-support/',
        title: 'Feature support for frameworks',
        type: 'link',
      },
    ],
  },
];

const versions = ['6.0', '6.1', '6.2', null, '6.4.0-beta.11'];

export const pageContext = {
  docsToc,
  framework: 'react',
  version: versions[0],
  versions,
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
