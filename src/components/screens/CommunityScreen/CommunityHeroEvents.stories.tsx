import React from 'react';
import { CommunityHeroEvents } from './CommunityHeroEvents';

export default {
  title: 'screens/CommunityScreen/CommunityHeroEvents',
  component: CommunityHeroEvents,
};

export const Default = (args) => <CommunityHeroEvents {...args} />;
Default.args = {
  youTubeUrl: '/youTube',
  twitterUrl: '/twitter',
  chatUrl: '/discord',
};
Default.storyName = 'CommunityHeroEvents';
