import React from 'react';

import { PureCommunityScreen } from './CommunityScreen';

export default {
  title: 'screens/CommunityScreen',
  component: PureCommunityScreen,
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const Default = (args) => <PureCommunityScreen {...args} />;
Default.args = {
  npmDownloads: 16094826,
  twitterFollowerCount: 18351,
  discordMemberCount: 14930,
  githubContributorCount: 1814,
  youTubeSubscriberCount: 2650,
  githubStars: 73811,
};
Default.storyName = 'CommunityScreen';
