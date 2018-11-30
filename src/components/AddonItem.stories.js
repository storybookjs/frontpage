import React from 'react';
import { storiesOf } from '@storybook/react';

import AddonItem from './AddonItem';

storiesOf('IndexScreen/AddonItem', module)
  .add('community', () => (
    <AddonItem
      title="Props combinations"
      desc="Given possible values for each prop, renders your component with all combinations of prop values. Useful for finding edge cases or just seeing all component states at once."
    />
  ))
  .add('official', () => (
    <AddonItem
      appearance="official"
      image={<img src="/addons/knobs.svg" />}
      title="Knobs"
      desc="Interact with component inputs dynamically in the Storybook UI"
    />
  ));
