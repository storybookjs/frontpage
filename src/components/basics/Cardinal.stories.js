import React from 'react';

import Cardinal from './Cardinal';

export default {
  title: 'Basics/Cardinal',
  component: Cardinal,
};

export const AllCardinals = () => (
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
);

export const Loading = () => <Cardinal loading size="small" />;

export const WithLink = () => (
  <Cardinal
    size="small"
    count="700k"
    text="Installs per month"
    noPlural
    status="secondary"
    countLink="https://google.com"
  />
);
