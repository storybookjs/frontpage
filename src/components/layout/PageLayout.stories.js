import React from 'react';
import { storiesOf } from '@storybook/react';

import PageLayout from './PageLayout';
import { allMediumPost } from './Footer.stories';

storiesOf('layout/PageLayout', module)
  .add('not subscribed', () => <PageLayout allMediumPost={allMediumPost}>children</PageLayout>)
  .add('subscribed', () => <PageLayout allMediumPost={allMediumPost}>children</PageLayout>);
