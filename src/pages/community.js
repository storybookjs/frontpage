import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { global } from '@storybook/design-system';

import CommunityScreen from '../components/screens/CommunityScreen/CommunityScreen';

const { GlobalStyle } = global;

const ALGOLIA_API_KEY = process.env.GATSBY_ALGOLIA_API_KEY;

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

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
    contributors: shuffle(contributors),
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
