import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Footer from './Footer';

export const onSubscribe = action('onSubscribe');
storiesOf('layout/Footer', module)
  .add('not subscribed', () => <Footer hasSubscribed={false} onSubscribe={onSubscribe} />)
  .add('subscribed', () => <Footer hasSubscribed onSubscribe={onSubscribe} />);
