import React, { Fragment } from 'react';

import NotFoundScreen from '../components/screens/NotFoundScreen/NotFoundScreen';
import { GlobalStyle } from '../components/basics/shared/global';

export default () => (
  <Fragment>
    <GlobalStyle />
    <NotFoundScreen />
  </Fragment>
);
