import React from 'react';
import { CommunitySponsors } from './CommunitySponsors';

export default {
  title: 'screens/CommunityScreen/CommunitySponsors',
  component: CommunitySponsors,
};

export const Default = (args) => <CommunitySponsors {...args} />;
Default.args = {
  openCollectiveUrl: '/openCollective',
};
Default.storyName = 'CommunitySponsors';
