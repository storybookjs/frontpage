import React from 'react';
import { CommunityHeroSupport } from './CommunityHeroSupport';

export default {
  title: 'screens/CommunityScreen/CommunityHeroSupport',
  component: CommunityHeroSupport,
};

export const Default = (args) => <CommunityHeroSupport {...args} />;
Default.args = {
  repoUrl: 'github.com/storybookjs/storybook',
  version: '6.5',
  apiKey: 'API_KEY',
};
Default.storyName = 'CommunityHeroSupport';
