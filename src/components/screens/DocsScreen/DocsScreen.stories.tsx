import React from 'react';
import { storiesOf } from '@storybook/react';

import DocsScreen from './DocsScreen';

const data = {
  currentPage: {
    html: 'html content',
    frontmatter: {
      title: 'Docs Screen Title',
    },
  },
};

const tocItem = { githubUrl: 'github.com' };

const nextTocItem = { path: '/path', title: 'Title', description: 'This is a description.' };

export default {
  title: 'Frontpage|screens/DocsScreen/DocsScreen',
  component: DocsScreen,
};

export const Base = () => <DocsScreen data={data} pageContext={{ tocItem: {} }} />;

export const WithGuideLink = () => <DocsScreen data={data} pageContext={{ nextTocItem }} />;

export const WithGuideLinkNoDescription = () => (
  <DocsScreen
    data={data}
    pageContext={{ nextTocItem: { ...nextTocItem, description: undefined } }}
  />
);

export const WithGithubLink = () => <DocsScreen data={data} pageContext={{ tocItem }} />;

export const WithGithubLinkAndGuideLink = () => (
  <DocsScreen data={data} pageContext={{ tocItem, nextTocItem }} />
);
