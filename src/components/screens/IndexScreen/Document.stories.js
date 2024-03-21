import React from 'react';
import { Document } from './Document';

export default {
  title: 'Screens/IndexScreen/Document',
  component: Document,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

export const Default = {
  render: () => <Document docs="/" />,

  parameters: {
    backgrounds: { default: 'dark' },
  },
};
