import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import TableOfContents from './TableOfContents';

const Wrapper = styled.div`
  width: 80px;
  padding-right: 5px;
`;

storiesOf('Frontpage|screens/ReleasesScreen/TableOfContents', module)
  .addDecorator((storyFn) => <Wrapper>{storyFn()}</Wrapper>)
  .add('default', () => (
    <TableOfContents
      currentPageSlug="/2.0"
      entries={[
        {
          slug: '/2.0',
          title: '2.0',
        },
        {
          slug: '/1.3',
          title: '1.3',
        },
        {
          slug: '/1.1',
          title: '1.1',
        },
        {
          slug: '/1.0',
          title: '1.0',
        },
      ]}
    />
  ));
