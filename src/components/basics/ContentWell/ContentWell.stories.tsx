import React from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/design-system';

import { ContentWell, ContentWellProps } from './ContentWell';

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
  title: 'Frontpage|basics/ContentWell',
  component: ContentWell,
};

export const Variants = () => (
  <>
    <ContentWell variant="neutral">
      <Title>I'm a neutral ContentWell</Title>
      <BodyText>I'm here to convey some information</BodyText>
    </ContentWell>
    <br />
    <ContentWell variant="positive">
      <Title>I'm a positive ContentWell</Title>
      <BodyText>I'm here to convey some information</BodyText>
    </ContentWell>
    <br />
    <ContentWell variant="selected">
      <Title>I'm a selected ContentWell</Title>
      <BodyText>I'm here to convey some information</BodyText>
    </ContentWell>
  </>
);
