import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Menu } from '@storybook/components-marketing';

import buildPathWithFramework from '../../../util/build-path-with-framework';
import stylizeFramework from '../../../util/stylize-framework';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { useDocsContext } from './DocsContext';

const getFrameworkLogo = (framework) => {
  if (framework === 'rax') return '/frameworks/logo-rax.png';
  return `/frameworks/logo-${framework}.svg`;
};

const FrameworkLogo = styled.img`
  width: 12;
  height: 12;
`;

interface FrameworkSelectorProps {
  coreFrameworks: string[];
  communityFrameworks: string[];
  slug: string;
}

type LinkWrapperProps = {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export function FrameworkSelector({
  coreFrameworks,
  communityFrameworks,
  slug,
}: FrameworkSelectorProps) {
  const frameworks = [...coreFrameworks, ...communityFrameworks] as const;

  // TODO: How to access framework in localStorage
  const {
    framework: [framework, setFramework],
  } = useDocsContext();

  const links = frameworks.map((f) => ({
    link: {
      linkWrapper: forwardRef<HTMLAnchorElement, LinkWrapperProps>(({ onClick, ...props }, ref) => (
        <GatsbyLinkWrapper
          onClick={(event) => {
            setFramework(f);
            onClick?.(event);
          }}
          ref={ref}
          {...props}
        />
      )),
      url: buildPathWithFramework(slug, f),
    },
    framework: f,
    icon: <FrameworkLogo src={getFrameworkLogo(f)} alt="" />,
    label: stylizeFramework(f),
  }));

  const coreLinks = links.filter(({ framework: f }) => coreFrameworks.includes(f));
  const communityLinks = links.filter(({ framework: f }) => !coreFrameworks.includes(f));

  const frameworkOptions = [
    {
      label: 'Core',
      items: coreLinks,
    },
    {
      label: 'Community',
      items: communityLinks,
    },
  ];

  return <Menu label={stylizeFramework(framework)} items={frameworkOptions} primary />;
}

FrameworkSelector.propTypes = {
  coreFrameworks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  communityFrameworks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  slug: PropTypes.string.isRequired,
};
