import React from 'react';
import { action } from '@storybook/addon-actions';

import MailingListSubscribeForm from './MailingListSubscribeForm';

const onSubscribe = action('onSubscribe');

export default {
  title: 'Layout/MailingListSubscribeForm',
  component: MailingListSubscribeForm,
};

export const Basic = () => <MailingListSubscribeForm cta="Sign up" onSubscribe={onSubscribe} />;

export const OptIn = {
  render: () => (
    <MailingListSubscribeForm
      optIn="Subscribe to this list"
      cta="Sign up"
      onSubscribe={onSubscribe}
    />
  ),

  name: 'Opt-in',
};
