import React from 'react';
import { storiesOf } from '@storybook/react';

import BenefitItem from './BenefitItem';
import BenefitList from './BenefitList';

const Benefit = (
  <BenefitItem
    image={<img src="/images/home/build-canvas.png" alt="build" />}
    title="Build components in isolation"
    desc="Create components without needing to stand up screens, fuss with data, or build business logic."
  />
);

storiesOf('screens/IndexScreen/BenefitList', module).add('default', () => (
  <BenefitList>
    {Benefit}
    {Benefit}
    {Benefit}
    {Benefit}
  </BenefitList>
));
