import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { global } from '@storybook/design-system';

import { AddonsHomeScreen } from '../components/screens/AddonsHomeScreen/AddonsHomeScreen';

const { GlobalStyle } = global;

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
export default ({ data }) => (
  <Fragment>
    <GlobalStyle />
    <AddonsHomeScreen popularAddons={data.popularAddons.nodes} />
  </Fragment>
);

export const query = graphql`
  query AddonsHomeQuery {
    popularAddons: allAddonsYaml(filter: { tags: { eq: "popular" } }) {
      nodes {
        ...AddonItem
      }
    }
  }
`;
