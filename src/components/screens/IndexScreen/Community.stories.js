import React from 'react';
import { Community } from './Community';

export default {
  title: 'Screens/IndexScreen/Community',
  component: Community,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

export const Default = () => <Community />;
Default.parameters = {
  backgrounds: { default: 'dark' },
};
