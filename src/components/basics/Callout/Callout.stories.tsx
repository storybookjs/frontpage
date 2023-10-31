import React from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/design-system';

import { Callout } from './Callout';

const { spacing } = styles;

const StoryWrapper = styled.div`
  padding: ${spacing.padding.medium}px;
`;

export default {
  title: 'Basics/Callout',
  component: Callout,
  parameters: {
    chromatic: { viewports: [320, 900] },
  },
  decorators: [(story) => <StoryWrapper>{story()}</StoryWrapper>],
};

export const Default = {
  args: {
    title: "Hello there, I'm a Callout",
    children: `I'm here to bring attention to some important information that you might be interested in.`,
  },
};

export const Variants = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <>
      <Callout {...args} variant="neutral" title="I'm a neutral Callout" />
      <br />
      <Callout {...args} variant="positive" title="I'm a positive Callout" />
      <br />
      <Callout {...args} variant="info" title="I'm an Info Callout" />
      <br />
      <Callout {...args} variant="warning" title="I'm a warning Callout" />
    </>
  ),
};

export const WithEmoji = {
  args: {
    ...Default.args,
    icon: '👋',
  },
};

export const WithoutTitle = {
  args: {
    ...WithEmoji.args,
    title: undefined,
  },
};

export const WithMarkdownTitle = {
  args: {
    ...WithEmoji.args,
    title: '`next/font` support',
  },
};
