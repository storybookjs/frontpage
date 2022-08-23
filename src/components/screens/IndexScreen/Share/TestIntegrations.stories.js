import React from 'react';
import { TestIntegrations } from './TestIntegrations';

export default {
  title: 'Screens/IndexScreen/Share/TestIntegrations',
  component: TestIntegrations,
};

export const Default = () => (
  <div style={{ maxWidth: 800, padding: 32 }}>
    <TestIntegrations />
  </div>
);
Default.parameters = {
  backgrounds: { default: 'dark' },
};
