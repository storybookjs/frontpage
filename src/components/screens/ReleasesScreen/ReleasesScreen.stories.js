import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import ReleasesScreen from './ReleasesScreen';
import compiledMDX from '../../../../.storybook/compiled-mdx';
import { CODE_SNIPPET_CLASSNAME } from '../../../constants/code-snippets';

export const buildRelease = (version) => ({
  body: compiledMDX,
  fields: {
    slug: `/${version}`,
    version,
  },
  frontmatter: {
    title: `Version ${version}`,
  },
});

const currentPage = buildRelease('2.0');

const data = {
  allReleases: {
    edges: [
      {
        node: currentPage,
      },
      {
        node: buildRelease('1.0'),
      },
    ],
  },
  currentPage,
};

const Wrapper = styled.div`
  .${CODE_SNIPPET_CLASSNAME} {
    margin-top: 15px;
  }
`;

export default {
  title: 'Frontpage|screens/ReleasesScreen/ReleasesScreen',
  component: ReleasesScreen,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
  excludeStories: ['buildRelease'],
};

export const Base = () => <ReleasesScreen data={data} />;
