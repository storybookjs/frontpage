import React from 'react';
import DocsLayout from './DocsLayout';

const { toc: docsToc } = require('../../content/docs/toc');
const addStateToToc = require('../../util/add-state-to-toc');

const docsTocWithPaths = addStateToToc(docsToc);
const docsTocWithPathsAndFramework = addStateToToc(docsToc, '/docs/react');

export const pageContext = {
  framework: 'react',
  docsToc: docsTocWithPathsAndFramework,
  tocItem: { ...docsTocWithPaths[0].children[0], githubUrl: undefined },
  fullPath: '/docs/react/get-started/introduction',
  slug: '/docs/get-started/introduction',
};

export default {
  title: 'Frontpage|layout/DocsLayout',
  component: DocsLayout,
  excludeStories: ['pageContext'],
};

export const Base = () => <DocsLayout pageContext={pageContext}>children</DocsLayout>;
