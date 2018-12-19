/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Link } from '../basics';

import Eyebrow from './Eyebrow';

storiesOf('layout/Eyebrow', module).add('default', () => (
  <div>
    <Eyebrow>
      Default eyebrow lorem ipsum dolor{' '}
      <Link href="https://google.com" inverse>
        <b>Link</b>
      </Link>
    </Eyebrow>
    <Eyebrow warning>
      Warning eyebrow lorem ipsum dolor{' '}
      <Link href="https://google.com" secondary>
        <b>Link</b>
      </Link>
    </Eyebrow>
    <Eyebrow positive>
      Positive eyebrow lorem ipsum dolor{' '}
      <Link href="https://google.com" secondary>
        <b>Link</b>
      </Link>
    </Eyebrow>
  </div>
));
