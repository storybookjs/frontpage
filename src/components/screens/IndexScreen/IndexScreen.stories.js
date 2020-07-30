import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureIndexScreen } from './IndexScreen';

storiesOf('Frontpage|screens/IndexScreen/IndexScreen', module).add(
  'default',
  () => <PureIndexScreen />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
