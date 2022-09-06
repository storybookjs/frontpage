import React from 'react';

import IframeReleasesScreen from './IframeReleasesScreen';

import { buildRelease } from './ReleasesScreen.stories';

export default {
  title: 'screens/ReleasesScreen/IframeReleasesScreen',
  component: IframeReleasesScreen,
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

const data = {
  currentPage: buildRelease('1.0'),
};

export const Default = () => <IframeReleasesScreen data={data} />;
