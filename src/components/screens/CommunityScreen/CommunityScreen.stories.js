import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureCommunityScreen } from './CommunityScreen';

storiesOf('Frontpage|screens/CommunityScreen/CommunityScreen', module).add(
  'default',
  () => <PureCommunityScreen npmDownloads={16084504} githubStarCount={73778} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
