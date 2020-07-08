import React from 'react';
import { storiesOf } from '@storybook/react';

import Feature from './Feature';
import FeaturesLayout from './FeaturesLayout';
import DirectionSVG from '../../images/colored-icons/direction.svg';

storiesOf('Frontpage|layout/FeaturesLayout', module)
  .add('2 column', () => (
    <FeaturesLayout columns={2}>
      <Feature
        image={<img src={DirectionSVG} alt="direction" />}
        title="Develop for every use case"
        desc="Storybook makes it dead simple to mock hard-to-reach states and edge cases"
      />
      <Feature
        image={<img src={DirectionSVG} alt="direction" />}
        title="Develop for every use case"
        desc="Storybook makes it dead simple to mock hard-to-reach states and edge cases"
      />
    </FeaturesLayout>
  ))
  .add('3 column', () => (
    <FeaturesLayout columns={3}>
      <Feature
        image={<img src={DirectionSVG} alt="direction" />}
        title="Develop for every use case"
        desc="Storybook makes it dead simple to mock hard-to-reach states and edge cases"
      />
      <Feature
        image={<img src={DirectionSVG} alt="direction" />}
        title="Develop for every use case"
        desc="Storybook makes it dead simple to mock hard-to-reach states and edge cases"
      />
      <Feature
        image={<img src={DirectionSVG} alt="direction" />}
        title="Develop for every use case"
        desc="Storybook makes it dead simple to mock hard-to-reach states and edge cases"
      />
    </FeaturesLayout>
  ));
