import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Menu } from '@storybook/components-marketing';

import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { LS_SELECTED_FRAMEWORK_KEY } from '../../../constants/local-storage';
import { useLocalStorage } from '../../../hooks/use-local-storage';
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

type LinkWrapperProps = {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export function FrameworkSelector({
  framework: initialFramework,
  coreFrameworks,
  communityFrameworks,
  slug,
}: FrameworkSelectorProps) {
  // TODO: useMemo causes type of `frameworks` to be `readonnly string[]` instead of `readonly ["react", "vue", ...]`
  const frameworks = React.useMemo(
    () => [...coreFrameworks, ...communityFrameworks] as const,
    [coreFrameworks, communityFrameworks]
  );

  const [framework, setFramework] = useLocalStorage<typeof frameworks[number]>(
    LS_SELECTED_FRAMEWORK_KEY,
    initialFramework,
    true
  );

  React.useLayoutEffect(() => {
    if (!frameworks.includes(framework)) {
      // Invalid framework in localStorage
      setFramework(initialFramework);
    }
  }, [framework, frameworks, setFramework, initialFramework]);

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
  framework: PropTypes.string.isRequired,
  coreFrameworks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  communityFrameworks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  slug: PropTypes.string.isRequired,
};
