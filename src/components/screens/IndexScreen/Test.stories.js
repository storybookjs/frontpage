import React from 'react';
import { Test } from './Test';

export default {
  title: 'Screens/IndexScreen/Test',
  component: Test,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

export const Default = () => <Test docs="/" />;
Default.parameters = {
  backgrounds: { default: 'dark' },
};
