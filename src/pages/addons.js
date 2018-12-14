import React, { Fragment } from 'react';

import AddonScreen from '../components/screens/AddonScreen/AddonScreen';
import { GlobalStyle } from '../components/basics/shared/global';

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
export default () => (
  <Fragment>
    <GlobalStyle />
    <AddonScreen />
  </Fragment>
);
