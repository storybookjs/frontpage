import React from 'react';
import CommunityScreen from './CommunityScreen';
import { Default as CommunityMaintainersDefault } from './CommunityMaintainers.stories';
import { Default as CommunitySponsorsDefault } from './CommunitySponsors.stories';

export default {
  title: 'screens/CommunityScreen',
  component: CommunityScreen,
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const Default = (args) => <CommunityScreen {...args} />;
Default.args = {
  npmDownloads: 16094826,
  twitterFollowerCount: 18351,
  discordMemberCount: 14930,
  githubContributorCount: 1814,
  youTubeSubscriberCount: 2650,
  githubStars: 73811,
  apiKey: 'api_key',
  contributors: CommunityMaintainersDefault.args.contributors,
  sponsors: CommunitySponsorsDefault.args.sponsors,
};
Default.storyName = 'CommunityScreen';
