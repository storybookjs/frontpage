import React, { Fragment } from 'react';
import { global } from '@storybook/design-system';

import NotFoundScreen from '../components/screens/NotFoundScreen/NotFoundScreen';

const { GlobalStyle } = global;

export default () => (
  <Fragment>
    <GlobalStyle />
    <NotFoundScreen />
  </Fragment>
);
