import React from 'react';
import { Share } from './Share';

export default {
  title: 'Screens/IndexScreen/Share/Share',
  component: Share,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

export const Default = () => <Share docs="/" />;
Default.storyName = 'Share';
Default.parameters = {
  backgrounds: { default: 'dark' },
};
