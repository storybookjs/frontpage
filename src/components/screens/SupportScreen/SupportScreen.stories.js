/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureSupportScreen } from './SupportScreen';
import { allMediumPost } from '../../layout/Footer.stories';

storiesOf('screens/SupportScreen/SupportScreen', module).add(
  'default',
  () => <PureSupportScreen data={{ allMediumPost }} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
