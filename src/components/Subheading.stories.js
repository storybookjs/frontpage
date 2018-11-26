/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Subheading from './Subheading';

storiesOf('composition/Subheading', module).add('subheading', () => (
  <Subheading>Subheading</Subheading>
));
