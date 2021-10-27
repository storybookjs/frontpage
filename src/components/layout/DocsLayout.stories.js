import React from 'react';
import DocsLayout from './DocsLayout';

const {
  coreFrameworks,
  communityFrameworks,
  featureGroups,
} = require('../../content/docs/frameworks');
const { toc: docsToc } = require('../../content/docs/toc');
const addStateToToc = require('../../util/add-state-to-toc');

export const data = {
  currentPage: {
    fields: { version: null },
  },
};

const docsTocWithPaths = addStateToToc(docsToc);
const docsTocWithPathsAndFramework = addStateToToc(docsToc, '/docs/react');

export const pageContext = {
  framework: 'react',
  coreFrameworks,
  communityFrameworks,
  featureGroups,
  docsToc: docsTocWithPathsAndFramework,
  tocItem: { ...docsTocWithPaths[0].children[0], githubUrl: undefined },
  fullPath: '/docs/react/get-started/introduction',
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
