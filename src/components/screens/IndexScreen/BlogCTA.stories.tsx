import React from 'react';
import { styled } from '@storybook/theming';

import { BlogCTA } from './BlogCTA';

const Wrapper = styled.div`
  padding: 20px;
`;

export default {
  title: 'Frontpage|screens/IndexScreen/BlogCTA',
  component: BlogCTA,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const Template = (args) => <BlogCTA {...args} />;

export const Default = Template.bind({});
Default.args = {
  slug: '#',
  title: 'Blog post title',
};
