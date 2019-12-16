import React from 'react';
import { storiesOf } from '@storybook/react';

import { Badge } from '@storybook/design-system';
import BenefitItem from './BenefitItem';

storiesOf('Frontpage|screens/IndexScreen/BenefitItem', module)
  .add('default', () => (
    <BenefitItem
      image={<img src="/images/home/build-canvas.png" alt="build" />}
      title="Build components in isolation"
      desc="Create components without needing to stand up screens, fuss with data, or build business logic."
    />
  ))
  .add('w/children', () => (
    <BenefitItem
      image={<img src="/images/home/build-cases.png" alt="build" />}
      title="Build components in isolation"
      desc="Create components without needing to stand up screens, fuss with data, or build business logic."
    >
      <Badge status="positive">Coming soon</Badge>
    </BenefitItem>
  ));
