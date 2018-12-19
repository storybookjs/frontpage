/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import AddonScreen from './AddonScreen';

storiesOf('screens/AddonScreen/AddonScreen', module).add('default', () => <AddonScreen />, {
  chromatic: { viewports: [320, 1200] },
});
