/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import Integrations from './Integrations';

export default {
  title: 'Pages/IndexScreen/Integrations',
  decorators: [(storyFn) => <div style={{ padding: '60px 0' }}>{storyFn()}</div>],
};

export const Default = () => <Integrations />;
