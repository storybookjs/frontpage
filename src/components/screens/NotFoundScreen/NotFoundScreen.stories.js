import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureNotFoundScreen } from './NotFoundScreen';

storiesOf('Frontpage|screens/NotFoundScreen/NotFoundScreen', module).add('default', () => (
  <PureNotFoundScreen />
));
