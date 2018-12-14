/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityScreen from './CommunityScreen';
import { onSubscribe } from './CommunityHero.stories';

storiesOf('screens/CommunityScreen/CommunityScreen', module)
  .add('not subscribed', () => <CommunityScreen hasSubscribed={false} onSubscribe={onSubscribe} />)
  .add('subscribed', () => <CommunityScreen hasSubscribed onSubscribe={onSubscribe} />);
