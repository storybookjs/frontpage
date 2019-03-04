import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureIndexScreen } from './IndexScreen';
import { gitHubRepoData } from './Hero.stories';
import { allMediumPost } from '../../layout/Footer.stories';

storiesOf('screens/IndexScreen/IndexScreen', module).add(
  'default',
  () => <PureIndexScreen data={{ gitHubRepoData, allMediumPost }} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
