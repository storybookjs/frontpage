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

export const Default = {
  render: () => <UIReview docs="/" />,

  parameters: {
    backgrounds: { default: 'dark' },
  },
};
