import React from 'react';
import { CommunitySidebar } from './CommunitySidebar';

export default {
  title: 'screens/CommunityScreen/CommunitySidebar',
  component: CommunitySidebar,
};

export const Default = () => <CommunitySidebar badgeUrl="/badge" activeSection="#support" />;
Default.storyName = 'CommunitySidebar';
