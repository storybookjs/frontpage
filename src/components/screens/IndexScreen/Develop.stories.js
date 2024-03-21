import React from 'react';
import { Develop } from './Develop';

export default {
  title: 'Screens/IndexScreen/Develop',
  component: Develop,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

export const Default = {
  render: () => <Develop docs="/" />,

  parameters: {
    backgrounds: { default: 'dark' },
  },
};
