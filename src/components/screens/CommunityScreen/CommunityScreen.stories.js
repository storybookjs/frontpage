/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureCommunityScreen } from './CommunityScreen';
import { gitHubRepoData } from './CommunityHero.stories';
import { allMediumPost } from '../../layout/Footer.stories';

storiesOf('screens/CommunityScreen/CommunityScreen', module).add(
  'default',
  () => <PureCommunityScreen data={{ gitHubRepoData, allMediumPost }} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
