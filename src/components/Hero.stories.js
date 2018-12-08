import React from 'react';
import { storiesOf } from '@storybook/react';

import Hero from './Hero';

storiesOf('Screens/IndexScreen/Hero', module).add('default', () => (
  <div style={{ padding: '3rem 0' }}>
    <Hero />
  </div>
));
