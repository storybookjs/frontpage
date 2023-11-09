import React, { FC } from 'react';
import { JSIcon, ShellIcon, TSIcon } from './icons';

type SnippetIcon = 'JavaScript' | 'Shell' | 'TypeScript';

const SnippetTypeIcons: Record<SnippetIcon, JSX.Element> = {
  JavaScript: JSIcon,
  Shell: ShellIcon,
  TypeScript: TSIcon,
};

function getSnippetTypeIcon(type: SnippetIcon): JSX.Element {
  return SnippetTypeIcons[type];
}

function mapFileNameToIcon(fileName: string): JSX.Element {
  const extension = fileName.split('.').pop();
  switch (extension) {
    case 'js':
    case 'jsx':
      return getSnippetTypeIcon('JavaScript');
    case 'ts':
    case 'tsx':
      return getSnippetTypeIcon('TypeScript');
    case 'sh':
    default:
      return getSnippetTypeIcon('Shell');
  }
}

export interface IconProps {
  fileName: string;
}

export const SnippetTypeIcon: FC<IconProps> = ({ fileName, ...props }) => {
  const icon = mapFileNameToIcon(fileName);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      {icon}
    </svg>
  );
};
