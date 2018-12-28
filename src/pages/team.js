import React, { Fragment } from 'react';

import TeamScreen from '../components/screens/TeamScreen/TeamScreen';
import { GlobalStyle } from '../components/basics/shared/global';

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
export default () => (
  <Fragment>
    <GlobalStyle />
    <TeamScreen />
  </Fragment>
);
