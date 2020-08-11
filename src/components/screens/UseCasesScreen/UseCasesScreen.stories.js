import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureUseCasesScreen } from './UseCasesScreen';

storiesOf('Frontpage|screens/UseCasesScreen/UseCasesScreen', module).add(
  'default',
  () => <PureUseCasesScreen />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
