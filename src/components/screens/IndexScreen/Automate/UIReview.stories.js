import React from 'react';
import { UIReview } from './UIReview';

export default {
  title: 'Screens/IndexScreen/Automate/UIReview',
  component: UIReview,
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: 'fullscreen',
  },
};

// animation only triggers when the element scrolls into view
export const Default = () => <UIReview docs="/" />;
Default.parameters = {
  backgrounds: { default: 'dark' },
};
