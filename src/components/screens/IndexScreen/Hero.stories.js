import React from 'react';
import { Hero } from './Hero';

export default {
  title: 'Screens/IndexScreen/Hero',
  component: Hero,
};

export const Default = {
  render: () => <Hero npmDownloads={16094826} contributorCount={1814} />,

  parameters: {
    backgrounds: { default: 'dark' },
  },
};
