import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureAddonScreen } from './AddonScreen';

storiesOf('Frontpage|screens/AddonScreen/AddonScreen', module).add(
  'default',
  () => <PureAddonScreen />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
