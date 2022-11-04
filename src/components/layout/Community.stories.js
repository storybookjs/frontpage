import React from 'react';
import { Community as CommunityComponent } from './Community';

export default {
  title: 'Screens/IndexScreen/Community',
  component: CommunityComponent,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

export const Community = () => <CommunityComponent />;
Community.parameters = {
  backgrounds: { default: 'dark' },
};
