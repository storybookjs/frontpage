/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import TeamScreen from './TeamScreen';

storiesOf('screens/TeamScreen/TeamScreen', module).add('default', () => <TeamScreen />, {
  chromatic: { viewports: [320, 1200] },
});
