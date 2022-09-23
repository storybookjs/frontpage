import React from 'react';
import { CommunityContribute } from './CommunityContribute';

export default {
  title: 'screens/CommunityScreen/CommunityContribute',
  component: CommunityContribute,
};

export const Default = (args) => <CommunityContribute {...args} />;
Default.args = {
  contributorCount: 1440,
  docsUrl: '/docs',
  issuesUrl: '/issues',
  contributeUrl: '/contribute',
  chatUrl: '/chat',
};
Default.storyName = 'CommunityContribute';
