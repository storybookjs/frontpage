import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import PageLayout from './PageLayout';
import { onSubscribe } from './Footer.stories';

storiesOf('layout/PageLayout', module)
  .add('not subscribed', () => <PageLayout>children</PageLayout>)
  .add('subscribed', () => <PageLayout>children</PageLayout>);
