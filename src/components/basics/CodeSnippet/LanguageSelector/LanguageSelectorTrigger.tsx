import React, { FC } from 'react';
import { css, styled } from '@storybook/theming';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { Icon, color, fontWeight, spacing, typography } from '@chromaui/tetra';

export const buttonStyles = css`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${spacing[2]};
  outline: none;
  user-select: none;
  border-radius: 4px;
  border: none;
  height: ${spacing[8]};
  background: transparent;
  gap: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  ${typography.body14}
  font-weight: ${fontWeight.bold};

  &:focus {
    box-shadow: 0 0 0 2px rgba(30, 167, 253, 0.3);
    background-color: rgba(30, 167, 253, 0.14);
  }

  &:hover {
    background-color: rgba(30, 167, 253, 0.14);
    color: ${color.blue500};
  }
`;

const TriggerButton = styled(RadixDropdownMenu.Trigger, {
  shouldForwardProp: (propName) => propName !== 'variant' && propName !== 'isActive',
})<{
  variant?: 'light' | 'dark';
  isActive?: boolean;
}>`
  ${buttonStyles}
  background-color: ${({ isActive }) => isActive && 'rgba(30, 167, 253, 0.07)'};
  color: ${({ isActive, variant }) => {
    if (isActive) return color.blue500;
    if (variant === 'light') return color.slate500;
    return color.white;
  }};

  &[data-state='open'] {
    background-color: rgba(30, 167, 253, 0.14);
    color: ${color.blue500};
  }

  &[data-state='open'] > .CaretDown {
    transform: rotate(-180deg) translateY(0px);
  }
`;

const CaretDown = styled.div`
  position: relative;
  transform: translateY(2px);
  transition: transform 250ms ease;
`;

interface DesktopItemProps {
  variant?: 'light' | 'dark';
  children?: React.ReactNode;
}

export const LanguageSelectorTrigger: FC<DesktopItemProps> = ({ children, variant = 'light' }) => {
  return (
    <>
      <TriggerButton variant={variant}>
        {children}
        <CaretDown className="CaretDown">
          <Icon name="arrowdown" aria-hidden size={12} />
        </CaretDown>
      </TriggerButton>
    </>
  );
};
