import React, { Fragment } from 'react';
import { global } from '@storybook/design-system';

import NotFoundScreen from '../components/screens/NotFoundScreen/NotFoundScreen';

const { GlobalStyle } = global;

const Page404 = () => (
  <Fragment>
    <GlobalStyle />
    <NotFoundScreen />
  </Fragment>
);

export default Page404;
