import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureCommunityScreen } from './CommunityScreen';
import { gitHubRepoData } from './CommunityHero.stories';

storiesOf('Frontpage|screens/CommunityScreen/CommunityScreen', module).add(
  'default',
  () => <PureCommunityScreen data={{ gitHubRepoData }} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
