import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureCommunityScreen } from './CommunityScreen';

storiesOf('Frontpage|screens/CommunityScreen/CommunityScreen', module).add(
  'default',
  () => <PureCommunityScreen />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
