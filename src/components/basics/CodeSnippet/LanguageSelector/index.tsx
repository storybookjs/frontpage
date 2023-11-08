import React, { ElementType } from 'react';
import { styled } from '@storybook/theming';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { typography, color, spacing, fontWeight } from '@chromaui/tetra';

import { LanguageSelectorTrigger } from './LanguageSelectorTrigger';

const DropdownMenuContent = styled(RadixDropdownMenu.Content)`
  margin: 0;
  background: ${color.white};
  border-radius: 4px;
  padding: 0;
  display: flex;
  flex-direction: column;

  box-shadow: 0px 0px 15px ${color.blackTr05}, 0px 1px 2px ${color.blackTr10};
`;

const DropdownMenuButton = styled.button`
  all: unset;
  ${typography.body14};
  color: ${color.slate800};
  cursor: pointer;
  text-decoration: none;
  font-weight: ${fontWeight.semibold};
  display: flex;
  flex: 1;
  align-items: center;
  padding: ${spacing[2]} ${spacing[4]};
  border-radius: 4px;

  &[data-highlighted] {
    box-shadow: inset 0 0 0 2px rgba(30, 167, 253, 0.3);
    background-color: ${color.blue100};
    outline: none;
  }
`;

interface MenuItem {
  id: string;
  label: string;
  value: string;
}

interface LanguageSelectorProps {
  variant?: 'light' | 'dark';
  items: MenuItem[];
}

export const LanguageSelector = ({ variant, items, ...props }: LanguageSelectorProps) => {
  return (
    <RadixDropdownMenu.Root>
      <LanguageSelectorTrigger variant={variant}>TypeScript</LanguageSelectorTrigger>
      <RadixDropdownMenu.Portal>
        <DropdownMenuContent loop align="start" sideOffset={8}>
          {items.map((item) => (
            <RadixDropdownMenu.Item asChild key={item.id}>
              <DropdownMenuButton>{item.label}</DropdownMenuButton>
            </RadixDropdownMenu.Item>
          ))}
        </DropdownMenuContent>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};
