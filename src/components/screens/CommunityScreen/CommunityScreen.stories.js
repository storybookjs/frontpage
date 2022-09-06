import React from 'react';

import { PureCommunityScreen } from './CommunityScreen';

export default {
  title: 'screens/CommunityScreen',
  component: PureCommunityScreen,
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const Default = () => (
  <PureCommunityScreen npmDownloads={16084504} githubStarCount={73778} />
);
Default.storyName = 'CommunityScreen';
