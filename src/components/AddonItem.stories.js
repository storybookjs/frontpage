import React from 'react';
import { storiesOf } from '@storybook/react';

import AddonItem from './AddonItem';

storiesOf('IndexScreen/AddonItem', module).add('default', () => (
  <AddonItem
    image={<img src="/addons/knobs.svg" />}
    title="Knobs"
    desc="Interact with component inputs dynamically in the Storybook UI"
  />
));
