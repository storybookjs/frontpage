import React from 'react';

import { PureIndexScreen } from './IndexScreen';

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
Default.parameters = {
  backgrounds: { default: 'dark' },
};

// export const WithLatestBlogPost = Template.bind({});
// WithLatestBlogPost.parameters = Default.parameters;
// WithLatestBlogPost.args = {
//   latestBlogPost: {
//     slug: '#',
//     title: 'Latest blog post title is a bit long to test layout',
//   },
// };
