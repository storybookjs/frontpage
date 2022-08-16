import React from 'react';
import { UITests } from './UITests';

export default {
  title: 'Screens/IndexScreen/Automate/UITests',
  component: UITests,
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: 'fullscreen',
  },
};

// animation only triggers when the element scrolls into view
export const Default = () => (
  <div style={{ marginTop: 1200, marginBottom: 300 }}>
    <UITests />
  </div>
);
Default.parameters = {
  backgrounds: { default: 'dark' },
};
