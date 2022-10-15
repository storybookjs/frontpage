import React from 'react';
import { CommunitySupport } from './CommunitySupport';

export default {
  title: 'screens/CommunityScreen/CommunitySupport',
  component: CommunitySupport,
};

export const Default = (args) => <CommunitySupport {...args} />;
Default.args = {
  repoUrl: 'github.com/storybookjs/storybook',
  chatUrl: '/discord',
  version: '6.5',
  apiKey: 'API_KEY',
};
Default.storyName = 'CommunitySupport';
