import React from 'react';
import { storiesOf } from '@storybook/react';

import PageLayout from './PageLayout';

storiesOf('layout/PageLayout', module)
  .add('not subscribed', () => <PageLayout>children</PageLayout>)
  .add('subscribed', () => <PageLayout>children</PageLayout>);
