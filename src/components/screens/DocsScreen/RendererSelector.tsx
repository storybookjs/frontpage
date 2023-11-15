import React, { FC } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { breakpoint, color, typography, spacing, fontWeight } from '@chromaui/tetra';
import { css, styled } from '@storybook/theming';
import { ChevronSmallDownIcon } from '@storybook/icons';
import stylizeRenderer from '../../../util/stylize-renderer';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { useDocsContext } from './DocsContext';

const Root = styled.div`
  display: flex;
  gap: ${spacing[2]};
  margin-bottom: ${spacing[8]};
`;

const Pill = styled.button<{ isActive?: boolean }>`
  all: unset;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  border: 1px solid ${color.slate400};
  padding: 0 ${spacing[2]};
  ${typography.body14}
  gap: 4px;

  &[data-state='open'] {
    border: 1px solid ${color.blue500};
  }

  &[data-state='open'] > .CaretDown {
    transform: rotate(-180deg) translateY(0px);
  }

  &:hover {
    border: 1px solid ${color.blue500};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      font-weight: ${fontWeight.bold};
      color: ${color.blue500};
      border: 1px solid ${color.blue500};
    `};
`;

const CaretDown = styled.div`
  position: relative;
  width: 14px;
  height: 14px;
  transition: transform 250ms ease;
`;

const MenuContent = styled(RadixDropdownMenu.Content)`
  min-width: 120px;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
`;

const MenuItem = styled(RadixDropdownMenu.Item)`
  ${typography.body14}
  color: ${color.slate800};
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 16px;
  position: relative;
  user-select: none;
  text-decoration: none;

  &[data-highlighted] {
    outline: none;
    background-color: ${color.slate100};
    border-radius: 3px;
  }
`;

type RendererSelectorProps = {
  coreRenderers: string[];
  communityRenderers: string[];
};

export const RendererSelector: FC<RendererSelectorProps> = ({
  coreRenderers,
  communityRenderers,
}) => {
  const {
    renderer: [renderer, setRenderer],
  } = useDocsContext();

  const pillItems = coreRenderers.slice();
  const menuItems = communityRenderers.slice();

  const [narrow] = useMediaQuery(`(max-width: ${breakpoint.sm * (2 / 3)}px)`);

  if (narrow) {
    // Remove the last pill item and store it
    const lastPillItem = pillItems.pop();

    // Add the last pill item to the start of the menu
    menuItems.unshift(lastPillItem);
  }

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

  const listOfItems = menuItems.map((r) => ({
    id: r,
    label: stylizeRenderer(r),
    onClick: () => {
      setRenderer(r);
    },
  }));

  return (
    <Root>
      {pillItems.map((r) => (
        <Pill key={r} isActive={r === renderer} onClick={() => setRenderer(r)}>
          {stylizeRenderer(r)}
        </Pill>
      ))}
      <RadixDropdownMenu.Root modal={false}>
        <RadixDropdownMenu.Trigger asChild>
          <Pill>
            More
            <CaretDown className="CaretDown">
              <ChevronSmallDownIcon aria-hidden />
            </CaretDown>
          </Pill>
        </RadixDropdownMenu.Trigger>
        <RadixDropdownMenu.Portal>
          <MenuContent loop align="start" sideOffset={8}>
            {listOfItems.map((item) => (
              <MenuItem key={item.id} onSelect={item.onClick}>
                {item.label}
              </MenuItem>
            ))}
          </MenuContent>
        </RadixDropdownMenu.Portal>
      </RadixDropdownMenu.Root>
    </Root>
  );
};
