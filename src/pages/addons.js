import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { global } from '@storybook/design-system';

import { AddonsHomeScreen } from '../components/screens/AddonsHomeScreen/AddonsHomeScreen';

const { GlobalStyle } = global;

const AddonsPage = ({ data }) => (
  <Fragment>
    <GlobalStyle />
    <AddonsHomeScreen
      popularAddons={{
        MONTH: data.addons.popularMonthly,
        YEAR: data.addons.popularYearly,
      }}
      trendingAddons={data.addons.trending}
    />
  </Fragment>
);

export default AddonsPage;

export const query = graphql`
  query AddonsHomeQuery {
    addons {
      popularMonthly: top(sort: featuredMonthly, limit: 12) {
        ...AddonItem
      }
      popularYearly: top(sort: featuredYearly, limit: 12) {
        ...AddonItem
      }
      trending: top(sort: trending, limit: 12) {
        ...AddonItem
      }
    }
  }
`;
