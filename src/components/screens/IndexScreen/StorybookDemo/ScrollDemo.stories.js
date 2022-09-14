import { useMotionValue } from 'framer-motion';
import React from 'react';
import { ScrollDemo } from './ScrollDemo';

export default {
  title: 'StorybookDemo/ScrollDemo',
  component: ScrollDemo,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
};

export const Default = () => {
  const value = useMotionValue(0);
  return (
    <ScrollDemo
      style={{ width: 800 }}
      isolationProgress={value}
      addonsProgress={value}
      dropInProgress={value}
      storyIndex={value}
      panelIndex={value}
    />
  );
};
Default.storyName = 'ScrollDemo';
Default.parameters = {
  backgrounds: { default: 'dark' },
};
