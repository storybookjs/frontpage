import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityHero from './CommunityHero';

export const onSubscribe = action('onSubscribe');
storiesOf('screens/CommunityScreen/CommunityHero', module)
  .add('not subscribed', () => <CommunityHero hasSubscribed={false} onSubscribe={onSubscribe} />)
  .add('subscribed', () => <CommunityHero hasSubscribed onSubscribe={onSubscribe} />);
