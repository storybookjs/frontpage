import React from 'react';

import ReleaseNotFound from './ReleaseNotFound';

export default {
  title: 'screens/ReleasesScreen/ReleaseNotFound',
  component: ReleaseNotFound,
};

export const Default = {
  render: () => <ReleaseNotFound version="1.0" />,
  name: 'ReleaseNotFound',
};
