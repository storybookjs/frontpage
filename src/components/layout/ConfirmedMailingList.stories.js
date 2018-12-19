import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ConfirmedMailingList, { PureConfirmedMailingList } from './ConfirmedMailingList';

const onSubscribe = action('onSubscribe');
storiesOf('layout/ConfirmedMailingList', module)
  .add('pure, not subscribed', () => (
    <PureConfirmedMailingList hasSubscribed={false} onSubscribe={onSubscribe} />
  ))
  .add('pure, subscribed', () => (
    <PureConfirmedMailingList hasSubscribed onSubscribe={onSubscribe} />
  ))
  .add('interactive', () => <ConfirmedMailingList />, {
    notes: 'This will sign you up for our mailinglist',
  });
