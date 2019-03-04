/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureUseCasesScreen } from './UseCasesScreen';
import { allMediumPost } from '../../layout/Footer.stories';

storiesOf('screens/UseCasesScreen/UseCasesScreen', module).add(
  'default',
  () => <PureUseCasesScreen data={{ allMediumPost }} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
