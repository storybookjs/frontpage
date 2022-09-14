import { useMotionValue } from 'framer-motion';
import React from 'react';
import { HeroDemo } from './HeroDemo';

export default {
  title: 'StorybookDemo/HeroDemo',
  component: HeroDemo,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
};

export const Default = () => {
  const value = useMotionValue(0);
  return (
    <HeroDemo
      style={{ width: 800 }}
      type="rangeSlider"
      isolationProgress={value}
      addonsProgress={value}
      dropInProgress={value}
      storyIndex={value}
      panelIndex={value}
    />
  );
};
Default.storyName = 'HeroDemo';
Default.parameters = {
  backgrounds: { default: 'dark' },
};
