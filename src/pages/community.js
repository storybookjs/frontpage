import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { global } from '@storybook/design-system';

import CommunityScreen from '../components/screens/CommunityScreen/CommunityScreen';

const { GlobalStyle } = global;

const ALGOLIA_API_KEY = process.env.GATSBY_ALGOLIA_API_KEY;

// In theory we could pass in props that we'd fetched via Gatsby's GraphQL
const CommunityPage = ({ data }) => {
  const {
    dxData: {
      npmDownloads,
      twitterFollowerCount,
      discordMemberCount,
      githubContributorCount,
      youTubeSubscriberCount,
      githubStars,
      contributors,
      sponsors,
    },
  } = data;

  const communityData = {
    npmDownloads,
    twitterFollowerCount,
    discordMemberCount,
    githubContributorCount,
    youTubeSubscriberCount,
    githubStars,
    contributors,
    sponsors,
  };

  return (
    <Fragment>
      <GlobalStyle />
      <CommunityScreen {...communityData} apiKey={ALGOLIA_API_KEY} />
    </Fragment>
  );
};

export default CommunityPage;

// prettier-ignore
export const query = graphql`
  query CommunityScreenQuery {
    dxData {
      npmDownloads
      twitterFollowerCount
      discordMemberCount
      githubContributorCount
      youTubeSubscriberCount
      githubStars
      contributors {
        name
        avatar
        url
      }
      sponsors {
        name
        image
        url
      }
    }
  }
`;
