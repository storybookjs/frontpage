import React from 'react';
import { Link } from '@storybook/design-system';

import EyebrowComponent from './Eyebrow';

export default {
  title: 'Layout/Eyebrow',
  component: EyebrowComponent,
};

export const Eyebrow = () => (
  <div>
    <EyebrowComponent>
      Default eyebrow lorem ipsum dolor{' '}
      <Link href="https://google.com" inverse>
        <b>Link</b>
      </Link>
    </EyebrowComponent>
    <EyebrowComponent warning>
      Warning eyebrow lorem ipsum dolor{' '}
      <Link href="https://google.com" secondary>
        <b>Link</b>
      </Link>
    </EyebrowComponent>
    <EyebrowComponent positive>
      Positive eyebrow lorem ipsum dolor{' '}
      <Link href="https://google.com" secondary>
        <b>Link</b>
      </Link>
    </EyebrowComponent>
  </div>
);
