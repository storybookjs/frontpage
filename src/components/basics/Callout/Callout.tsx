import React from 'react';
import { rgba } from 'polished';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/design-system';

const { spacing, color, background } = styles;

type Variant = 'neutral' | 'positive' | 'selected';

const VARIANT_COLORS: Record<Variant, { background: string; border: string }> = {
  neutral: { background: color.mediumlight, border: rgba(color.darker, 0.1) },
  positive: { background: background.positive, border: rgba(color.positive, 0.1) },
  selected: { background: background.calmBlue, border: rgba(color.selected, 0.1) },
};

export interface CalloutProps {
  variant: Variant;
}
export const Callout = styled.div<CalloutProps>`
  padding: ${spacing.padding.medium}px;
  border-radius: ${spacing.borderRadius.small}px;

  ${({ variant }) => `
    background: ${VARIANT_COLORS[variant].background};
    box-shadow: ${VARIANT_COLORS[variant].border} 0 0 0 1px inset;
  `}

  && *:last-child {
    margin-bottom: 0px;
  }
`;

Callout.defaultProps = {
  variant: 'neutral',
};
