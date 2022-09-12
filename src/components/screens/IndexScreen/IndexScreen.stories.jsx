import React from 'react';
import IndexScreen from './IndexScreen';
import { projects } from './SocialValidation.stories';

export default {
  title: 'Screens/IndexScreen/IndexScreen',
  component: IndexScreen,
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: 'fullscreen',
  },
};

const Template = (args) => <IndexScreen {...args} />;

export const Default = Template.bind({});
Default.args = {
  projects,
  npmDownloads: 16094826,
  twitterFollowerCount: 18351,
  discordMemberCount: 14930,
  githubContributorCount: 1814,
  youTubeSubscriberCount: 2650,
};
Default.parameters = {
  backgrounds: { default: 'dark' },
};
