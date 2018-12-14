import React, { Fragment } from 'react';

import SupportScreen from '../components/screens/SupportScreen/SupportScreen';
import { GlobalStyle } from '../components/basics/shared/global';

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
export default () => (
  <Fragment>
    <GlobalStyle />
    <SupportScreen />
  </Fragment>
);
