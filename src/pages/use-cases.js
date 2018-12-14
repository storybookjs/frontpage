import React, { Fragment } from 'react';

import UseCasesScreen from '../components/screens/UseCasesScreen/UseCasesScreen';
import { GlobalStyle } from '../components/basics/shared/global';

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
export default () => (
  <Fragment>
    <GlobalStyle />
    <UseCasesScreen />
  </Fragment>
);
