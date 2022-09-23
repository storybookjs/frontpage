import React from 'react';
import { CommunityHero } from './CommunityHero';

export default {
  title: 'screens/CommunityScreen/CommunityHero',
  component: CommunityHero,
};

export const Default = (args) => <CommunityHero {...args} />;
Default.args = {
  npmDownloads: 16094826,
  twitterFollowerCount: 18351,
  discordMemberCount: 14930,
  githubContributorCount: 1814,
  youTubeSubscriberCount: 2650,
  githubStars: 73811,
};
Default.storyName = 'CommunityHero';
