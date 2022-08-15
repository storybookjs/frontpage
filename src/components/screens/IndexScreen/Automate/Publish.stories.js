import React from 'react';
import { Publish } from './Publish';

export default {
  title: 'Screens/IndexScreen/Automate/Publish',
  component: Publish,
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: 'fullscreen',
  },
};

export const Default = () => (
  <div style={{ marginTop: 1200, marginBottom: 300 }}>
    <Publish docs="/" />
  </div>
);
Default.parameters = {
  backgrounds: { default: 'dark' },
};
