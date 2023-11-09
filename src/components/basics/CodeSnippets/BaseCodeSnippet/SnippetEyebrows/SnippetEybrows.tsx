import React from 'react';
import { styled } from '@storybook/theming';
import { color, spacing, Text, typography } from '@chromaui/tetra';

const VARIANT_TO_COLOR_MAP = {
  info: color.blue100,
  warning: color.yellow100,
};

interface SnippetEyebrowProps {
  variant: 'info' | 'warning';
}

export const SnippetEyebrowContainer = styled.div<SnippetEyebrowProps>`
  ${typography.body14}
  padding: ${spacing['2']} ${spacing['3']};
  color: ${color.slate800};

  background-color: ${({ variant }) => VARIANT_TO_COLOR_MAP[variant]};
`;

export const SnippetEyebrow = ({
  variant,
  children,
}: React.PropsWithChildren<SnippetEyebrowProps>) => {
  return <SnippetEyebrowContainer variant={variant}>{children}</SnippetEyebrowContainer>;
};
