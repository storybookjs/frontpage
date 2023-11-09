import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Menu } from '@storybook/components-marketing';

import stylizeRenderer from '../../../util/stylize-renderer';
import { useDocsContext } from './DocsContext';

interface RendererSelectorProps {
  coreRenderers: string[];
  communityRenderers: string[];
}

const RendererLogo = styled.img`
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

const getRendererLogo = (renderer) => {
  if (renderer === 'rax') return '/renderers/logo-rax.png';
  return `/renderers/logo-${renderer}.svg`;
};

export function RendererSelector({ coreRenderers, communityRenderers }: RendererSelectorProps) {
  const renderers = [...coreRenderers, ...communityRenderers] as const;

  // TODO: How to access framework in localStorage
  const {
    renderer: [renderer, setRenderer],
  } = useDocsContext();

  const items = renderers.map((r) => ({
    link: {
      linkWrapper: React.forwardRef<HTMLButtonElement, LinkWrapperProps>(
        ({ onClick, ...props }, ref) => {
          return (
            <MenuButton
              onClick={(event) => {
                setRenderer(r);
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
    renderer: r,
    icon: <RendererLogo src={getRendererLogo(r)} alt="" />,
    label: stylizeRenderer(r),
  }));

  const coreItems = items.filter(({ renderer: r }) => coreRenderers.includes(r));
  const communityItems = items.filter(({ renderer: r }) => !coreRenderers.includes(r));

  const rendererOptions = [
    {
      label: 'Core',
      items: coreItems,
    },
    {
      label: 'Community',
      items: communityItems,
    },
  ];

  return <Menu label={stylizeRenderer(renderer)} items={rendererOptions} primary />;
}
