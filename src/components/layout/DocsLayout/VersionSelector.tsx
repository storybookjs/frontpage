import React, { FC } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronSmallDownIcon } from '@storybook/icons';
import { styled } from '@storybook/theming';
import { color, typography } from '@chromaui/tetra';
import buildPathWithVersion from '../../../util/build-path-with-version';

interface Stable {
  version: number;
  string: string;
  label?: 'latest';
}

interface PreRelease {
  version: number;
  string: string;
  label: 'alpha' | 'beta' | 'rc' | 'future';
}

export interface Versions {
  stable: Stable[];
  preRelease: PreRelease[];
}

interface VersionSelectorProps {
  version: number;
  slug: string;
  versions: Versions;
}

const DropdownMenuTrigger = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid ${color.slate300};
  ${typography.body14}
  color: ${color.slate800};
  margin-top: 24px;
`;

const DropdownMenuContent = styled(DropdownMenu.Content)`
  min-width: 220px;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
`;

const DropdownMenuItem = styled.a`
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

const DropdownMenuLabel = styled(DropdownMenu.Label)`
  ${typography.body14}
  color: ${color.slate500};
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 16px;
  position: relative;
  user-select: none;

  &:not(:first-child) {
    margin-top: 4px;
  }
`;

export const VersionSelector: FC<VersionSelectorProps> = ({ version, versions, slug }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownMenuTrigger type="button" className="IconButton" aria-label="Customise options">
          Version {version}
          <ChevronSmallDownIcon color={color.slate500} />
        </DropdownMenuTrigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenuContent align="start">
          <DropdownMenu.Group>
            {versions.stable.length > 0 && <DropdownMenuLabel>Stable</DropdownMenuLabel>}
            {versions.stable.map(({ version: v, string, label }) => (
              <DropdownMenu.Item key={v} asChild>
                <DropdownMenuItem href={buildPathWithVersion(slug, string)}>
                  {label ? `${string} (${label})` : string}
                </DropdownMenuItem>
              </DropdownMenu.Item>
            ))}
            {versions.preRelease.length > 0 && <DropdownMenuLabel>Pre-release</DropdownMenuLabel>}
            {versions.preRelease.map(({ version: v, string, label }) => (
              <DropdownMenu.Item key={v} asChild>
                <DropdownMenuItem href={buildPathWithVersion(slug, string)}>
                  {label ? `${string} (${label})` : string}
                </DropdownMenuItem>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
