import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityHero from './CommunityHero';

const onSubscribe = action('onSubscribe');
storiesOf('Screens/CommunityScreen/CommunityHero', module)
  .add('not subscribed', () => <CommunityHero hasSubscribed={false} onSubscribe={onSubscribe} />)
  .add('subscribed', () => <CommunityHero hasSubscribed onSubscribe={onSubscribe} />);
