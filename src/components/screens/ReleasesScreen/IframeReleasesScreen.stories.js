import React from 'react';
import { storiesOf } from '@storybook/react';

import IframeReleasesScreen from './IframeReleasesScreen';

import { buildRelease } from './ReleasesScreen.stories';

const data = {
  currentPage: buildRelease('1.0'),
};

storiesOf('Frontpage|screens/ReleasesScreen/IframeReleasesScreen', module).add(
  'default',
  () => <IframeReleasesScreen data={data} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
