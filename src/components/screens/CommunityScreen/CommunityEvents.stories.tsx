import React from 'react';
import { CommunityEvents } from './CommunityEvents';

export default {
  title: 'screens/CommunityScreen/CommunityEvents',
  component: CommunityEvents,
};

export const Default = (args) => <CommunityEvents {...args} />;
Default.args = {
  youTubeUrl: '/youTube',
  twitterUrl: '/twitter',
  chatUrl: '/discord',
};
Default.storyName = 'CommunityEvents';
