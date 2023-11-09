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

function mapSyntaxToIcon(syntax: string): JSX.Element {
  switch (syntax) {
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
  syntax: string;
}

export const SnippetTypeIcon: FC<IconProps> = ({ syntax, ...props }) => {
  const icon = mapSyntaxToIcon(syntax);
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
