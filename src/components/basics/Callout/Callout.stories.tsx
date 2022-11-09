import React from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/design-system';

import { Callout } from './Callout';

export default {
  title: 'Basics/Callout',
  component: Callout,
  parameters: {
    chromatic: { viewports: [320, 900] },
  },
};

const { typography, spacing } = styles;

const StoryWrapper = styled.div`
  padding: ${spacing.padding.medium}px;
`;

const Title = styled.h1`
  font-family: ${typography.type};
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m3}px;
`;

const BodyText = styled.p`
  font-family: ${typography.type};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m3}px;
`;

const Template = (args) => (
  <StoryWrapper>
    <Callout {...args}>
      <Title>👋 Hello there, I'm a Callout</Title>
      <BodyText>
        I'm here to bring attention to some important information that you might be interested in.
        <br />
        You can play with the way I look using the prop controls below 👇
      </BodyText>
    </Callout>
  </StoryWrapper>
);

export const Default = Template.bind({});

export const Variants = () => (
  <StoryWrapper>
    <Callout variant="neutral">
      <Title>I'm a neutral Callout</Title>
      <BodyText>
        I'm here to bring attention to some important information that you might be interested in
      </BodyText>
    </Callout>
    <br />
    <Callout variant="positive">
      <Title>I'm a positive Callout</Title>
      <BodyText>
        I'm here to bring attention to some important information that you might be interested in
      </BodyText>
    </Callout>
    <br />
    <Callout variant="selected">
      <Title>I'm a selected Callout</Title>
      <BodyText>
        I'm here to bring attention to some important information that you might be interested in
      </BodyText>
    </Callout>
  </StoryWrapper>
);
