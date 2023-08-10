import React from 'react';
import { styled } from '@storybook/theming';
import { mdFormatting } from '../../../styles/formatting';
import { YouTubeCallout } from './YouTubeCallout';

const Wrapper = styled.div`
  max-width: 500px;
  padding: 20px;
`;

const MDWrapper = styled.main`
  ${mdFormatting}
  flex: 1;
`;

export default {
  title: 'Screens/DocsScreen/YouTubeCallout',
  component: YouTubeCallout,
  args: {
    id: 'FVg9eWQsUbU',
    title: 'Theme your Web Apps like a PRO | Dark Mode in Storybook',
  },
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const Template = (args) => <YouTubeCallout {...args} />;

export const Default = Template.bind({});

export const Open = Template.bind({});
Open.args = {
  open: true,
};

export const InsideMdWrapper = Template.bind({});

InsideMdWrapper.decorators = [(storyFn) => <MDWrapper>{storyFn()}</MDWrapper>];

export const InsideMdWrapperOpen = Template.bind({});
InsideMdWrapperOpen.args = Open.args;
InsideMdWrapperOpen.decorators = InsideMdWrapper.decorators;

export const WithTimeStamp = Template.bind({});
WithTimeStamp.args = {
  ...Open.args,
  params: 'start=84',
};
