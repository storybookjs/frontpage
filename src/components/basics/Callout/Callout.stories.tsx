import React from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/design-system';

import { Callout } from './Callout';

const { typography } = styles;

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

export default {
  title: 'Frontpage|basics/Callout',
  component: Callout,
};

export const Variants = () => (
  <>
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
  </>
);
