import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureTeamScreen } from './TeamScreen';
import { gitHubRepoData } from '../IndexScreen/Hero.stories';

storiesOf('Frontpage|screens/TeamScreen/TeamScreen', module).add(
  'default',
  () => <PureTeamScreen data={{ gitHubRepoData }} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
