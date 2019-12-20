import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureSupportScreen } from './SupportScreen';

storiesOf('Frontpage|screens/SupportScreen/SupportScreen', module).add(
  'default',
  () => <PureSupportScreen />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
