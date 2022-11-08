import React from 'react';
import { Button } from '@storybook/design-system';

import CTAComponent from './CTA';

export default {
  title: 'Layout/CTA',
  component: CTAComponent,
  decorators: [(storyFn) => <div style={{ padding: '60px 0' }}>{storyFn()}</div>],
};

export const CTA = () => (
  <CTAComponent
    text={
      <span>
        Lorem ipsum dolor sit amet. <br /> Consectatur vestibulum.
      </span>
    }
    action={<Button appearance="secondary">Get started</Button>}
  />
);
