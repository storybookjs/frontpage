import { useMotionValue } from 'framer-motion';
import React from 'react';
import { StorybookDemo } from './StorybookDemo';

export default {
  title: 'Screens/IndexScreen/StorybookDemo',
  component: StorybookDemo,
  parameters: {
    layout: 'centered',
  },
};

export const Default = () => (
  <div style={{ maxWidth: 800 }}>
    <StorybookDemo activeStory={useMotionValue(0)} />
  </div>
);
Default.parameters = {
  backgrounds: { default: 'dark' },
};
