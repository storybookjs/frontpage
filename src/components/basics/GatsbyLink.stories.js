import React from 'react';
import { storiesOf } from '@storybook/react';
import GatsbyLink from './GatsbyLink';

storiesOf('Basics/GatsbyLink', module).add('GatsbyLink', () => (
  <GatsbyLink to="/">Link</GatsbyLink>
));
