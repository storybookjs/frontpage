/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureTeamScreen } from './TeamScreen';

storiesOf('screens/TeamScreen/TeamScreen', module).add(
  'default',
  () => (
    <PureTeamScreen data={{ gitHubRepoData: { contributorCount: 100, url: 'https://foo.com' } }} />
  ),
  {
    chromatic: { viewports: [320, 1200] },
  }
);
