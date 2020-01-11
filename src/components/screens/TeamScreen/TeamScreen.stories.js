/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import TeamScreen from './TeamScreen';
import { gitHubRepoData } from '../IndexScreen/Hero.stories';
import { github } from './Maintainers.stories';

storiesOf('Frontpage|screens/TeamScreen/TeamScreen', module)
  .addParameters({ chromatic: { viewports: [320, 1200] } })
  .add('default', () => <TeamScreen data={{ github, gitHubRepoData }} />)
  .add('without maintainers', () => <TeamScreen data={{ gitHubRepoData }} />);
