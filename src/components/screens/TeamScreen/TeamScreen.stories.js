import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureTeamScreen } from './TeamScreen';

storiesOf('Frontpage|screens/TeamScreen/TeamScreen', module).add(
  'default',
  () => <PureTeamScreen />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
