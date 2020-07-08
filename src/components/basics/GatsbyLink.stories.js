import React from 'react';
import { storiesOf } from '@storybook/react';
import GatsbyLink from './GatsbyLink';

storiesOf('Frontpage|basics/GatsbyLink', module).add('default', () => (
  <GatsbyLink to="/">Link</GatsbyLink>
));
