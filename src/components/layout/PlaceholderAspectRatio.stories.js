import React from 'react';
import { styled } from '@storybook/theming';

import PlaceholderAspectRatioComponent from './PlaceholderAspectRatio';

const Placeholder = styled(PlaceholderAspectRatioComponent)`
  background: green;
`;

export default {
  title: 'Layout/PlaceholderAspectRatio',
  component: PlaceholderAspectRatioComponent,
  decorators: [
    (storyFn) => (
      <div style={{ background: 'papayawhip', width: '400px', height: '400px' }}>{storyFn()}</div>
    ),
  ],
};

export const PlaceholderAspectRatio = () => <Placeholder ratio={0.75} />;
PlaceholderAspectRatio.storyName = 'PlaceholderAspectRatio';
