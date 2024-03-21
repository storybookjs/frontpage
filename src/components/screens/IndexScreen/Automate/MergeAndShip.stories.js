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

export const Default = {
  render: () => (
    <div style={{ marginTop: 1200, marginBottom: 300 }}>
      <MergeAndShip docs="/" />
    </div>
  ),

  parameters: {
    backgrounds: { default: 'dark' },
  },
};
