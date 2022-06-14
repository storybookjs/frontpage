import React, { Fragment } from 'react';
import { global } from '@storybook/design-system';

import CommunityScreen from '../components/screens/CommunityScreen/CommunityScreen';

const { GlobalStyle } = global;

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
const CommunityPage = () => (
  <Fragment>
    <GlobalStyle />
    <CommunityScreen />
  </Fragment>
);

export default CommunityPage;
