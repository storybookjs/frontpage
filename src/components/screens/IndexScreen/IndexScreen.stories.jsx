import React from 'react';

import { PureIndexScreen } from './IndexScreen';

export default {
  title: 'Frontpage|screens/IndexScreen/IndexScreen',
  component: PureIndexScreen,
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

const Template = (args) => <PureIndexScreen {...args} />;

export const Default = Template.bind({});
Default.storyName = 'default';

export const WithLatestBlogPost = Template.bind({});
WithLatestBlogPost.args = {
  latestBlogPost: {
    slug: '#',
    title: 'Latest blog post title is a bit long to test layout',
  },
};
