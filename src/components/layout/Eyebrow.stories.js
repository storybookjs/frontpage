import React from 'react';
import { storiesOf } from '@storybook/react';
import { Link } from '@storybook/design-system';

import Eyebrow from './Eyebrow';

storiesOf('Frontpage|layout/Eyebrow', module).add('default', () => (
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
