/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './../basics/Button';
import CTA from './CTA';

storiesOf('layout/CTA', module)
  .addDecorator(storyFn => <div style={{ padding: '60px 0' }}>{storyFn()}</div>)
  .add('default', () => (
    <CTA
      text={
        <span>
          Lorem ipsum dolor sit amet. <br /> Consectatur vestibulum.
        </span>
      }
      action={<Button primary>Get started</Button>}
    />
  ));
