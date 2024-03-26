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

export const Default = {
  render: () => (
    <div style={{ marginTop: 1200, marginBottom: 300 }}>
      <UITests />
    </div>
  ),

  parameters: {
    backgrounds: { default: 'dark' },
  },
};
