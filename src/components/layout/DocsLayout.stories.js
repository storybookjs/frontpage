import React from 'react';
import DocsLayout from './DocsLayout';
import { versions } from '../screens/DocsScreen/VersionSelector.stories';

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
  versions,
};

export default {
  title: 'Frontpage|layout/DocsLayout',
  component: DocsLayout,
  excludeStories: ['data', 'pageContext'],
};

const Template = (args) => <DocsLayout {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'children',
  data,
  pageContext,
};

export const NonLatestVersion = Template.bind({});
NonLatestVersion.args = {
  ...Base.args,
  data: {
    currentPage: {
      fields: {
        version: versions.stable[1].version,
      },
    },
  },
};
