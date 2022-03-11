import React from 'react';

import Integrations from './Integrations';

export default {
  title: 'Frontpage|screens/IndexScreen/Integrations',
  decorators: [(storyFn) => <div style={{ padding: '60px 0' }}>{storyFn()}</div>],
};

export const Default = () => <Integrations />;
