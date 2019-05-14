/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureAddonScreen } from './AddonScreen';
import { allMediumPost } from '../../layout/Footer.stories';

storiesOf('Frontpage|screens/AddonScreen/AddonScreen', module).add(
  'default',
  () => <PureAddonScreen data={{ allMediumPost }} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
