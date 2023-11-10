import * as React from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button, Icon, color, fontWeight, typography, spacing } from '@chromaui/tetra';
import { styled, css } from '@storybook/theming';

import stylizeRenderer from '../../../util/stylize-renderer';
import { useDocsContext } from './DocsContext';

const Root = styled.div`
  display: flex;
  gap: ${spacing[2]};
  margin-bottom: ${spacing[8]};
`;

const pillStyles = css`
  ${typography.body14}
  border-radius: ${spacing[1]};
  height: ${28 / 16}rem;
  padding: 0 ${spacing[2]};
  white-space: nowrap;

  &:hover {
    background-color: ${color.blueTr10};
  }
`;

const Pill = styled(({ isActive, ...props }) => (
  <Button color={isActive ? 'blue' : 'slate'} size="sm" variant="outline" {...props} />
))<{
  isActive?: boolean;
}>`
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

/**
 * This portion is copied from Tetra's NavDropdownMenu.
 * Notably:
 * - Styles for TriggerButton match Pill
 * - Menu items are not links
 */

const TriggerButton = styled(RadixDropdownMenu.Trigger, {
  shouldForwardProp: (propName) => !['isActive', 'variant'].includes(propName),
})<{
  variant?: 'light' | 'dark';
  isActive?: boolean;
}>`
  all: unset;
  ${pillStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  user-select: none;
  border: none;
  background: transparent;
  box-shadow: 0 0 0 1px ${color.slate400};
  gap: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;

  &[data-state='open'] {
    background-color: ${color.blueTr10};
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

interface MenuTriggerProps {
  variant?: 'light' | 'dark';
  children?: React.ReactNode;
}

export const MenuTrigger: React.FC<MenuTriggerProps> = ({ children, variant = 'light' }) => {
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

const MenuContent = styled(RadixDropdownMenu.Content)`
  margin: 0;
  background: ${color.white};
  border-radius: 4px;
  padding: ${spacing[2]};

  box-shadow: 0px 0px 15px ${color.blackTr05}, 0px 1px 2px ${color.blackTr10};
`;

const MenuItem = styled(RadixDropdownMenu.Item)`
  ${typography.body14};
  color: ${color.slate800};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: ${spacing[2]};
  border-radius: 4px;

  &[data-highlighted] {
    box-shadow: inset 0 0 0 2px rgba(30, 167, 253, 0.3);
    background-color: ${color.blue100};
    outline: none;
  }
`;

interface IMenuItem {
  id: string;
  label: string;
  onClick: () => void;
}

interface MenuProps {
  variant?: 'light' | 'dark';
  label: string;
  items: IMenuItem[];
}

const Menu = ({ label, variant, items, ...props }: MenuProps) => {
  return (
    <RadixDropdownMenu.Root>
      <MenuTrigger variant={variant}>{label}</MenuTrigger>

      <RadixDropdownMenu.Portal>
        <MenuContent loop align="start" sideOffset={8}>
          {items.map((item) => (
            <MenuItem key={item.id} onSelect={item.onClick}>
              {item.label}
            </MenuItem>
          ))}
        </MenuContent>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};

/** END NavDropdownMenu */

type RendererSelectorProps = {
  coreRenderers: string[];
  communityRenderers: string[];
};

export const RendererSelector = ({ coreRenderers, communityRenderers }: RendererSelectorProps) => {
  const {
    renderer: [renderer, setRenderer],
  } = useDocsContext();

  const pillItems = coreRenderers.slice();
  const menuItems = communityRenderers.slice();

  if (menuItems.includes(renderer)) {
    // Remove the last pill item and store it
    const lastPillItem = pillItems.pop();

    // Add the current renderer on the end of pillRenderers
    pillItems.push(renderer);

    // Remove the current renderer from the menu
    menuItems.splice(menuItems.indexOf(renderer), 1);

    // Add the last pill item to the start of the menu
    menuItems.unshift(lastPillItem);
  }

  return (
    <Root>
      {pillItems.map((r) => (
        <Pill key={r} isActive={r === renderer} onClick={() => setRenderer(r)}>
          {stylizeRenderer(r)}
        </Pill>
      ))}
      <Menu
        items={menuItems.map((r) => ({
          id: r,
          label: stylizeRenderer(r),
          onClick: () => {
            setRenderer(r);
          },
        }))}
        label="More"
      />
    </Root>
  );
};
