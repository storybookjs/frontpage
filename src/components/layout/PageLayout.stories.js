import React from 'react';
import { storiesOf } from '@storybook/react';

import PageLayout from './PageLayout';

storiesOf('Frontpage|layout/PageLayout', module).add('default', () => (
  <PageLayout>children</PageLayout>
));
