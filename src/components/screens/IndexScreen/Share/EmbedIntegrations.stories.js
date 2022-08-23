import React from 'react';
import { EmbedIntegrations } from './EmbedIntegrations';

export default {
  title: 'Screens/IndexScreen/Share/EmbedIntegrations',
  component: EmbedIntegrations,
};

export const Default = () => (
  <div style={{ maxWidth: 800, padding: 32 }}>
    <EmbedIntegrations />
  </div>
);
Default.storyName = 'EmbedIntegrations';
Default.parameters = {
  backgrounds: { default: 'dark' },
};
