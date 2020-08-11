import React from 'react';
import { storiesOf } from '@storybook/react';
import DirectionSVG from '../../images/colored-icons/direction.svg';
import Feature from './Feature';

storiesOf('Frontpage|layout/Feature', module)
  .add('default', () => (
    <Feature
      image={<img src={DirectionSVG} alt="direction" />}
      title="Develop for every use case"
      desc="Storybook makes it dead simple to mock hard-to-reach states and edge cases"
    />
  ))
  .add('w/children', () => (
    <Feature
      image={<img src={DirectionSVG} alt="direction" />}
      title="Develop for every use case"
      desc="Storybook makes it dead simple to mock hard-to-reach states and edge cases"
    >
      <div>children go here</div>
    </Feature>
  ));
