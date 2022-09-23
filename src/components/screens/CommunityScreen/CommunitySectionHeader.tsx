import React from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';

const { marketing, color } = styles;

const Title = styled.h2`
  ${marketing.subheading};
  color: ${color.darkest};
  margin-bottom: 0.5rem;
`;
const Description = styled.h2`
  ${marketing.textLarge};
  color: ${color.darkest};
`;

interface CommunitySectionHeaderProps {
  title: string;
  description: string;
}

export const CommunitySectionHeader = ({ title, description }: CommunitySectionHeaderProps) => (
  <div>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </div>
);
