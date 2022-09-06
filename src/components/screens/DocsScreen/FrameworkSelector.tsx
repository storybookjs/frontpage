import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Menu } from '@storybook/components-marketing';

import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import buildPathWithFramework from '../../../util/build-path-with-framework';
import stylizeFramework from '../../../util/stylize-framework';

const getFrameworkLogo = (framework) => {
  if (framework === 'rax') return '/frameworks/logo-rax.png';
  return `/frameworks/logo-${framework}.svg`;
};

const FrameworkLogo = styled.img`
  width: 12;
  height: 12;
`;

interface FrameworkSelectorProps {
  framework: string;
  coreFrameworks: string[];
  communityFrameworks: string[];
  slug: string;
}

export function FrameworkSelector({
  framework,
  coreFrameworks,
  communityFrameworks,
  slug,
}: FrameworkSelectorProps) {
  const links = [...coreFrameworks, ...communityFrameworks].map((f) => ({
    link: { LinkWrapper: GatsbyLinkWrapper, url: buildPathWithFramework(slug, f) },
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
  framework: PropTypes.string.isRequired,
  coreFrameworks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  communityFrameworks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  slug: PropTypes.string.isRequired,
};
