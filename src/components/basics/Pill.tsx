import * as React from 'react';
import { Button, color, fontWeight, typography, spacing } from '@chromaui/tetra';
import { styled, css } from '@storybook/theming';

export const pillStyles = css`
  ${typography.body14}
  border-radius: ${spacing[1]};
  height: ${28 / 16}rem;
  padding: 0 ${spacing[2]};
  white-space: nowrap;

  &:hover {
    background-color: ${color.blueTr10};
  }
`;

type PillProps = {
  isActive?: boolean;
};

export const Pill = styled(({ isActive, ...props }) => (
  <Button color={isActive ? 'blue' : 'slate'} size="sm" variant="outline" {...props} />
))<PillProps>`
  ${pillStyles}
  ${({ isActive }) =>
    isActive
      ? css`
          font-weight: ${fontWeight.bold};
        `
      : css`
          color: ${color.slate800};
        `}
`;
