import React from 'react';
import { storiesOf } from '@storybook/react';

import AddonItem from './AddonItem';
import AddonList from './AddonList';

const Addon = (
  <AddonItem
    image={<img src="/addons/knobs.svg" />}
    title="Knobs"
    desc="Interact with component inputs dynamically in the Storybook UI"
  />
);

storiesOf('IndexScreen/AddonList', module).add('default', () => (
  <AddonList>
    {Addon}
    {Addon}
    {Addon}
    {Addon}
  </AddonList>
));
