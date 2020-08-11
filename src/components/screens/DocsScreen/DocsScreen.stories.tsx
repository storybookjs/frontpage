import React from 'react';
import styled from 'styled-components';

import DocsScreen from './DocsScreen';
import compiledMDX from '../../../../.storybook/compiled-mdx';
import { pageContext } from '../../layout/DocsLayout.stories';

const data = {
  currentPage: {
    body: compiledMDX,
    frontmatter: {
      title: 'Docs Screen Title',
    },
  },
};

const tocItem = { path: '/path' };
const githubUrl = 'github.com';

const nextTocItem = { path: '/path', title: 'Title', description: 'This is a description.' };

const Wrapper = styled.div`
  padding-bottom: 10px;
`;

export default {
  title: 'Frontpage|screens/DocsScreen/DocsScreen',
  component: DocsScreen,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

export const Base = () => <DocsScreen data={data} pageContext={{ ...pageContext, tocItem }} />;

export const WithGuideLink = () => (
  <DocsScreen data={data} pageContext={{ ...pageContext, tocItem, nextTocItem }} />
);

export const WithGuideLinkNoDescription = () => (
  <DocsScreen
    data={data}
    pageContext={{
      ...pageContext,
      tocItem,
      nextTocItem: { ...nextTocItem, description: undefined },
    }}
  />
);

export const WithGithubLink = () => (
  <DocsScreen data={data} pageContext={{ ...pageContext, tocItem: { ...tocItem, githubUrl } }} />
);

export const WithGithubLinkAndGuideLink = () => (
  <DocsScreen
    data={data}
    pageContext={{ ...pageContext, tocItem: { ...tocItem, githubUrl }, nextTocItem }}
  />
);
