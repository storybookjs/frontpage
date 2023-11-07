import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Menu } from '@storybook/components-marketing';

import stylizeFramework from '../../../util/stylize-framework';
import { useDocsContext } from './DocsContext';

interface FrameworkSelectorProps {
  coreFrameworks: string[];
  communityFrameworks: string[];
}

const FrameworkLogo = styled.img`
  width: 12;
  height: 12;
`;

const MenuButton = styled.button`
  appearance: none;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
  width: 100%;
`;

type LinkWrapperProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const getFrameworkLogo = (framework) => {
  if (framework === 'rax') return '/frameworks/logo-rax.png';
  return `/frameworks/logo-${framework}.svg`;
};

export function FrameworkSelector({ coreFrameworks, communityFrameworks }: FrameworkSelectorProps) {
  const frameworks = [...coreFrameworks, ...communityFrameworks] as const;

  // TODO: How to access framework in localStorage
  const {
    framework: [framework, setFramework],
  } = useDocsContext();

  const items = frameworks.map((f) => ({
    link: {
      linkWrapper: React.forwardRef<HTMLButtonElement, LinkWrapperProps>(
        ({ onClick, ...props }, ref) => {
          return (
            <MenuButton
              onClick={(event) => {
                setFramework(f);
                onClick?.(event);
              }}
              ref={ref}
              {...props}
            />
          );
        }
      ),
      url: 'UNUSED', // We render a `button` instead of an `a`, but the types of Menu require this
    },
    framework: f,
    icon: <FrameworkLogo src={getFrameworkLogo(f)} alt="" />,
    label: stylizeFramework(f),
  }));

  const coreItems = items.filter(({ framework: f }) => coreFrameworks.includes(f));
  const communityItems = items.filter(({ framework: f }) => !coreFrameworks.includes(f));

  const frameworkOptions = [
    {
      label: 'Core',
      items: coreItems,
    },
    {
      label: 'Community',
      items: communityItems,
    },
  ];

  return <Menu label={stylizeFramework(framework)} items={frameworkOptions} primary />;
}
