import React from 'react';
import { MergeAndShip } from './MergeAndShip';

export default {
  title: 'Screens/IndexScreen/Automate/MergeAndShip',
  component: MergeAndShip,
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: 'fullscreen',
  },
};

// animation only triggers when the element scrolls into view
export const Default = () => (
  <div style={{ marginTop: 1200, marginBottom: 300 }}>
    <MergeAndShip docs="/" />
  </div>
);
Default.parameters = {
  backgrounds: { default: 'dark' },
};
