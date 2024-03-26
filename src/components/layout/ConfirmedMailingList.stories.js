import React from 'react';
import { action } from '@storybook/addon-actions';

import ConfirmedMailingList, { PureConfirmedMailingList } from './ConfirmedMailingList';

const onSubscribe = action('onSubscribe');
export default {
  title: 'Layout/ConfirmedMailingList',
  component: ConfirmedMailingList,
};

export const PureNotSubscribed = {
  render: () => <PureConfirmedMailingList hasSubscribed={false} onSubscribe={onSubscribe} />,

  name: 'Pure, not subscribed',
};

export const PureSubscribed = {
  render: () => <PureConfirmedMailingList hasSubscribed onSubscribe={onSubscribe} />,

  name: 'Pure, subscribed',
};

export const Interactive = () => <ConfirmedMailingList />;
