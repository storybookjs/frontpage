import React from 'react';
import { CommunityBrand } from './CommunityBrand';

export default {
  title: 'screens/CommunityScreen/CommunityBrand',
  component: CommunityBrand,
};

export const Default = (args) => <CommunityBrand {...args} />;
Default.args = {
  brandUrl: '/brand',
  designSystemUrl: '/designSystem',
  presentationUrl: '/keynote',
};
Default.storyName = 'CommunityBrand';
