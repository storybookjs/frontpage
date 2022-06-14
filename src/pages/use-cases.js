import React, { Fragment } from 'react';
import { global } from '@storybook/design-system';

import UseCasesScreen from '../components/screens/UseCasesScreen/UseCasesScreen';

const { GlobalStyle } = global;

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
const UseCasesPage = () => (
  <Fragment>
    <GlobalStyle />
    <UseCasesScreen />
  </Fragment>
);

export default UseCasesPage;
