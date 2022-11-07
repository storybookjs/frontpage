import React from 'react';
import { styled } from '@storybook/theming';

import VideoComponent from './Video';

export default {
  title: 'Basics/Video',
  component: VideoComponent,
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

const VideoWrapper = styled('div')`
  width: 45%
  margin: 0px auto;
`;

export const Video = () => (
  <VideoWrapper>
    <VideoComponent
      src="/videos/storybook-workflow-build-optimized-lg.mp4"
      alt="storybook example video"
      shouldChangeSize
    />
  </VideoWrapper>
);
