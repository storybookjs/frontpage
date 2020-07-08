import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MailingListSubscribeForm from './MailingListSubscribeForm';

const onSubscribe = action('onSubscribe');
storiesOf('Frontpage|layout/MailingListSubscribeForm', module)
  .add('basic', () => <MailingListSubscribeForm cta="Sign up" onSubscribe={onSubscribe} />)
  .add('opt-in', () => (
    <MailingListSubscribeForm
      optIn="Subscribe to this list"
      cta="Sign up"
      onSubscribe={onSubscribe}
    />
  ));
