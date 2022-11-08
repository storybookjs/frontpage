import { useMotionValue } from 'framer-motion';
import React from 'react';
import { HeroDemo as HeroDemoComponent } from './HeroDemo';

export default {
  title: 'Storybook Demos/HeroDemo',
  component: HeroDemoComponent,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
};

export const HeroDemo = () => {
  const value = useMotionValue(0);
  return (
    <HeroDemoComponent
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
HeroDemo.storyName = 'HeroDemo';
HeroDemo.parameters = {
  backgrounds: { default: 'dark' },
};
