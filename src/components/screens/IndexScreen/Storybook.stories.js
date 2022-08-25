import { useMotionValue } from 'framer-motion';
import React from 'react';
import { Storybook } from './Storybook';

export default {
  title: 'Screens/IndexScreen/Storybook',
  component: Storybook,
  parameters: {
    layout: 'centered',
  },
};

export const Default = () => (
  <div style={{ maxWidth: 800 }}>
    <Storybook docs="/" activeStory={useMotionValue(0)} />
  </div>
);
Default.parameters = {
  backgrounds: { default: 'dark' },
};
