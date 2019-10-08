import React, { Fragment } from 'react';
import { global } from '@storybook/design-system';

import SupportScreen from '../components/screens/SupportScreen/SupportScreen';

const { GlobalStyle } = global;

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
export default () => (
  <Fragment>
    <GlobalStyle />
    <SupportScreen />
  </Fragment>
);
