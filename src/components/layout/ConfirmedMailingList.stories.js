import React from 'react';
import { action } from '@storybook/addon-actions';

import ConfirmedMailingList, { PureConfirmedMailingList } from './ConfirmedMailingList';

const onSubscribe = action('onSubscribe');
export default {
  title: 'Layout/ConfirmedMailingList',
  component: ConfirmedMailingList,
};
export const PureNotSubscribed = () => (
  <PureConfirmedMailingList hasSubscribed={false} onSubscribe={onSubscribe} />
);
PureNotSubscribed.storyName = 'Pure, not subscribed';

export const PureSubscribed = () => (
  <PureConfirmedMailingList hasSubscribed onSubscribe={onSubscribe} />
);
PureSubscribed.storyName = 'Pure, subscribed';

export const Interactive = () => <ConfirmedMailingList />;
