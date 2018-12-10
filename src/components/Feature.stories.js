/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Feature from './Feature';

storiesOf('screens/UseCasesScreen/Feature', module)
  .add('default', () => (
    <Feature
      image={<img src="images/colored-icons/direction.svg" />}
      title="Develop for every use case"
      desc="Storybook makes it dead simple to mock hard-to-reach states and edge cases"
    />
  ))
  .add('w/children', () => (
    <Feature
      image={<img src="images/colored-icons/direction.svg" />}
      title="Develop for every use case"
      desc="Storybook makes it dead simple to mock hard-to-reach states and edge cases"
    >
      <div>children go here</div>
    </Feature>
  ));
