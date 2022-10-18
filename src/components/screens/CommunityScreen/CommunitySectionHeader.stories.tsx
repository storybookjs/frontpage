import React from 'react';
import { CommunitySectionHeader } from './CommunitySectionHeader';

export default {
  title: 'screens/CommunityScreen/CommunitySectionHeader',
  component: CommunitySectionHeader,
};

export const Default = (args) => <CommunitySectionHeader {...args} />;
Default.args = {
  title: 'Sponsor the community',
  description:
    'Donations help keep the community going. They are used for web hosting, continuous integration, contributor swag, learning materials, and event production.',
};
Default.storyName = 'CommunitySectionHeader';
