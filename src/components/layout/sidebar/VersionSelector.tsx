import React, { FC } from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@storybook/icons';
import { styled } from '@storybook/theming';
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

interface SelectItemProps {
  value: string;
  children: string;
}

const SelectTrigger = styled(Select.Trigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: white;
  color: var(--violet-11);
  box-shadow: 0 2px 10px var(--black-a7);
`;

const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const SelectViewport = styled(Select.Viewport)`
  padding: 5px;
`;

const SelectItem = styled(Select.Item)`
  font-size: 13px;
  line-height: 1;
  color: var(--violet-11);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;

  &[data-disabled] {
    color: var(--mauve-8);
    pointer-events: none;
  }
  &[data-highlighted] {
    outline: none;
    background-color: var(--violet-9);
    color: var(--violet-1);
  }
`;

const SelectItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const VersionSelector: FC<VersionSelectorProps> = ({ version, versions, slug }) => {
  // const getVersionLink = ({ label, string }: { label?: string; string: string }) => ({
  //   label: stylizeVersion({ label, string }),
  //   link: { url: buildPathWithVersion(slug, string) },
  // });

  return (
    <Select.Root>
      <SelectTrigger aria-label="Food">
        <Select.Value asChild>
          <div>{version}</div>
        </Select.Value>
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </SelectTrigger>
      <Select.Portal>
        <SelectContent>
          <SelectViewport>
            <Select.Group>
              {versions.stable.length > 0 && (
                <Select.Label className="SelectLabel">Stable</Select.Label>
              )}
              {versions.stable.map(({ version: v, string, label }) => (
                <Item key={v} value={string}>
                  {label ? `${string} (${label})` : string}
                </Item>
              ))}
              {versions.preRelease.length > 0 && (
                <Select.Label className="SelectLabel">Prerelease</Select.Label>
              )}
              {versions.preRelease.map(({ version: v, string, label }) => (
                <Item key={v} value={string}>
                  {label ? `${string} (${label})` : string}
                </Item>
              ))}
            </Select.Group>
          </SelectViewport>
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  );
};

const Item = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectItem {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <SelectItemIndicator>
          <CheckIcon />
        </SelectItemIndicator>
      </SelectItem>
    );
  }
);
