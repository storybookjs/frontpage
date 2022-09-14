import React from 'react';
import { PublishIntegrations } from './PublishIntegrations';

export default {
  title: 'Screens/IndexScreen/Share/PublishIntegrations',
  component: PublishIntegrations,
};

export const Default = () => (
  <div style={{ maxWidth: 800, padding: 32 }}>
    <PublishIntegrations />
  </div>
);
Default.storyName = 'PublishIntegrations';
Default.parameters = {
  backgrounds: { default: 'dark' },
};
