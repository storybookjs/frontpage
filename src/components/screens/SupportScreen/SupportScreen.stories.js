/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import SupportScreen from './SupportScreen';

storiesOf('screens/SupportScreen/SupportScreen', module).add('default', () => <SupportScreen />, {
  chromatic: { viewports: [320, 1200] },
});
