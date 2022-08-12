import React from 'react';
import { Share } from './Share';

export default {
  title: 'Screens/IndexScreen/Share',
  component: Share,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

export const Default = () => <Share />;
Default.parameters = {
  backgrounds: { default: 'dark' },
};
