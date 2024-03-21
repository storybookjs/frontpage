import React from 'react';
import { Integrations } from './Integrations';

export default {
  title: 'Screens/IndexScreen/Integrations',
  component: Integrations,
};

export const Default = {
  render: () => <Integrations docs="/" />,

  parameters: {
    backgrounds: { default: 'dark' },
  },
};
