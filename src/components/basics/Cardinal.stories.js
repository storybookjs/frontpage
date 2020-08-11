import React from 'react';
import { storiesOf } from '@storybook/react';

import Cardinal from './Cardinal';

storiesOf('Frontpage|basics/Cardinal', module)
  .add('all cardinals', () => (
    <div style={{ background: 'white' }}>
      <Cardinal loading size="small" />
      <Cardinal size="small" count="77" text="Default" noPlural status="default" />
      <Cardinal size="small" count="v5.0" text="Latest version" noPlural status="primary" />
      <Cardinal size="small" count="700k" text="Installs per month" noPlural status="secondary" />
      <Cardinal size="small" count="+500" text="Contributors" noPlural status="tertiary" />

      <br />
      <Cardinal size="large" count="v5.0" text="Latest version" noPlural status="primary" />
      <Cardinal size="large" count="700k" text="Installs per month" noPlural status="secondary" />
      <Cardinal size="large" count="+500" text="Contributors" noPlural status="tertiary" />
    </div>
  ))
  .add('loading', () => <Cardinal loading size="small" />)
  .add('w/link', () => (
    <Cardinal
      size="small"
      count="700k"
      text="Installs per month"
      noPlural
      status="secondary"
      countLink="https://google.com"
    />
  ));
