/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureTeamScreen } from './TeamScreen';
import { gitHubRepoData } from '../IndexScreen/Hero.stories';
import { allMediumPost } from '../../layout/Footer.stories';

storiesOf('screens/TeamScreen/TeamScreen', module).add(
  'default',
  () => <PureTeamScreen data={{ gitHubRepoData, allMediumPost }} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
