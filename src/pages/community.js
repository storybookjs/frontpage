import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { global } from '@storybook/design-system';

import CommunityScreen from '../components/screens/CommunityScreen/CommunityScreen';

const { GlobalStyle } = global;

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
const CommunityPage = ({ data }) => {
  const {
    dxData: { npmDownloads, githubStars },
  } = data;

  return (
    <Fragment>
      <GlobalStyle />
      <CommunityScreen npmDownloads={npmDownloads} githubStarCount={githubStars} />
    </Fragment>
  );
};

export default CommunityPage;

// prettier-ignore
export const query = graphql`
  query CommunityScreenQuery {
    dxData {
      npmDownloads
      githubStars
    }
  }
`;
