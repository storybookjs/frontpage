import React, { Fragment } from 'react';

import CommunityScreen from '../components/screens/CommunityScreen/CommunityScreen';
import { GlobalStyle } from '../components/basics/shared/global';

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
export default () => (
  <Fragment>
    <GlobalStyle />
    <CommunityScreen />
  </Fragment>
);
