import React from 'react';
import { storiesOf } from '@storybook/react';

import IndexScreen from './IndexScreen';

storiesOf('screens/IndexScreen/IndexScreen', module).add('default', () => <IndexScreen />, {
  chromatic: { viewports: [320, 1200] },
});
