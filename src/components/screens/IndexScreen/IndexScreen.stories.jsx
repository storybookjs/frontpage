import React from 'react';
import { PureIndexScreen } from './IndexScreen';
import { projects, storybooks } from './SocialValidation.stories';

export default {
  title: 'Screens/IndexScreen/IndexScreen',
  component: PureIndexScreen,
  parameters: {
    chromatic: { viewports: [440, 600, 900, 1200] },
    layout: 'fullscreen',
  },
};

const Template = (args) => <PureIndexScreen {...args} />;

export const Default = Template.bind({});
Default.args = {
  projects,
  storybooks,
  npmDownloads: 16094826,
};
Default.parameters = {
  backgrounds: { default: 'dark' },
};
