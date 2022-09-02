import React from 'react';
import { StickyNav } from './StickyNav';

export default {
  title: 'Screens/IndexScreen/StickyNav',
  component: StickyNav,
  parameters: {
    chromatic: { viewports: [440, 1200] },
    layout: 'fullscreen',
  },
};

export const Default = () => <StickyNav docs="/docs" animationDisabled />;
Default.parameters = {
  backgrounds: { default: 'dark' },
};
