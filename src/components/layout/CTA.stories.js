import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from '@storybook/design-system';
import CTA from './CTA';

storiesOf('Frontpage|layout/CTA', module)
  .addDecorator(storyFn => <div style={{ padding: '60px 0' }}>{storyFn()}</div>)
  .add('default', () => (
    <CTA
      text={
        <span>
          Lorem ipsum dolor sit amet. <br /> Consectatur vestibulum.
        </span>
      }
      action={<Button appearance="secondary">Get started</Button>}
    />
  ));
