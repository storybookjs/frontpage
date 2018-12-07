import React from 'react';
import { storiesOf } from '@storybook/react';

import AddonItem from './AddonItem';
import AddonList from './AddonList';

const AddonCommunity = (
  <AddonItem
    image={<img src="images/addons/knobs.svg" />}
    title="Chapters"
    desc="With this addon, you can showcase multiple components (or varying component states) within 1 story. Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness."
    addonUrl="https://google.com"
  />
);

const AddonOfficial = (
  <AddonItem
    appearance="official"
    image={<img src="images/addons/knobs.svg" />}
    title="Knobs"
    desc="Interact with component inputs dynamically in the Storybook UI"
    addonUrl="https://google.com"
  />
);

storiesOf('Screens/AddonScreen/AddonList', module)
  .add('official', () => (
    <AddonList appearance="official">
      {AddonOfficial}
      {AddonOfficial}
      {AddonOfficial}
      {AddonOfficial}
      {AddonOfficial}
      {AddonOfficial}
    </AddonList>
  ))
  .add('community', () => (
    <AddonList>
      {AddonCommunity}
      {AddonCommunity}
      {AddonCommunity}
      {AddonCommunity}
    </AddonList>
  ));
