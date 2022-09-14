import React from 'react';
import { Integrations } from './Integrations';

export default {
  title: 'Screens/IndexScreen/Integrations',
  component: Integrations,
};

export const Default = () => <Integrations docs="/" />;
Default.parameters = {
  backgrounds: { default: 'dark' },
};
