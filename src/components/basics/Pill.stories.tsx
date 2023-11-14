import * as React from 'react';
import { styled } from '@storybook/theming';

import { Pill } from './Pill';

// Account for box-shadow on pills and height of open menu
const Wrapper = styled.div`
  min-height: 300px;
  padding: 1px;
`;

export default {
  title: 'Basics/Pill',
  component: Pill,
  args: {
    children: 'Pill',
  },
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};

export const Basic = {};

export const Active = {
  args: {
    isActive: true,
  },
};
