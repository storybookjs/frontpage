import React from 'react';
import snarkdown from 'snarkdown';

import { rgba } from 'polished';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/design-system';

const { spacing, color, background, typography, breakpoint } = styles;

type Variant = 'neutral' | 'positive' | 'info' | 'warning';

const VARIANT_COLORS: Record<Variant, { background: string; border: string }> = {
  neutral: { background: color.mediumlight, border: rgba(color.darker, 0.1) },
  positive: { background: background.positive, border: rgba(color.positive, 0.1) },
  info: { background: background.calmBlue, border: rgba(color.selected, 0.1) },
  warning: { background: background.warning, border: rgba(color.warning, 0.1) },
};

const VARIANT_DEFAULT_ICON: Partial<Record<Variant, string>> = {
  info: 'ℹ️',
  warning: '⚠️',
};

interface CalloutContainerProps {
  variant: Variant;
}
const CalloutContainer = styled.div<CalloutContainerProps>`
  padding: ${spacing.padding.medium}px;
  border-radius: ${spacing.borderRadius.small}px;
  display: flex;
  flex-direction: row;

  ${({ variant }) => `
    background: ${VARIANT_COLORS[variant].background};
    box-shadow: ${VARIANT_COLORS[variant].border} 0 0 0 1px inset;
  `}

  && *:last-child {
    margin-bottom: 0px;
  }
`;

CalloutContainer.defaultProps = {
  variant: 'neutral',
};

const CalloutIcon = styled.span`
  @media (min-width: ${breakpoint}px) {
    margin-right: ${spacing.padding.small}px;
    flex: 0 0 auto;
    font-size: ${typography.size.m2}px;
    display: inline-block;
  }
  display: none;
`;

CalloutIcon.defaultProps = {
  'aria-hidden': true,
};

const CalloutContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const CalloutTitle = styled.span`
  font-family: ${typography.type};
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m3}px;
  display: block;

  code {
    color: inherit;
  }
`;

const CalloutBodyText = styled.p`
  font-family: ${typography.type};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m3}px;
  margin: 0;
`;

export interface CalloutProps extends CalloutContainerProps {
  title?: string;
  icon?: string;
  children: string;
}

export const Callout = ({ title, icon, children, variant, ...props }: CalloutProps) => {
  const appliedIcon = icon ?? VARIANT_DEFAULT_ICON[variant];

  return (
    <CalloutContainer variant={variant} {...props}>
      {appliedIcon && <CalloutIcon>{appliedIcon}</CalloutIcon>}
      <CalloutContent>
        {title && <CalloutTitle dangerouslySetInnerHTML={{ __html: snarkdown(title) }} />}
        <CalloutBodyText>{children}</CalloutBodyText>
      </CalloutContent>
    </CalloutContainer>
  );
};
