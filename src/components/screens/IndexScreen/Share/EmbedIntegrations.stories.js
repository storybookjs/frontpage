import React from 'react';
import { EmbedIntegrations } from './EmbedIntegrations';

export default {
  title: 'Screens/IndexScreen/Share/EmbedIntegrations',
  component: EmbedIntegrations,
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 800, padding: 32 }}>
      <EmbedIntegrations isInView />
    </div>
  ),

  name: 'EmbedIntegrations',

  parameters: {
    backgrounds: { default: 'dark' },
  },
};
