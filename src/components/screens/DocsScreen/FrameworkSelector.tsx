import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, Subheading, TooltipLinkList, styles, WithTooltip } from '@storybook/design-system';

import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { buildPathWithVersionAndFramework } from '../../../util/build-path-with-framework';
import stylizeFramework from '../../../util/stylize-framework';

const { breakpoint, color, typography } = styles;

const Wrapper = styled.div`
  font-size: ${typography.size.s2}px;
`;

const Framework = styled.span`
  color: ${color.darker};

  display: none;
  @media (min-width: ${breakpoint * 1}px) {
    display: inline;
  }
`;

const FrameworkLink = styled(Link)`
  svg {
    transform: rotate(90deg);
  }
`;

const FrameworkSelectorTitle = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
`;

const LinkHeading = styled(Subheading)`
  display: block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 4.29px;
  line-height: 18px;
  color: ${color.mediumdark};
  padding: 7px 15px;
  border-bottom: 1px solid ${color.border};
  ${(props) => props.withTopBorder && `border-top: 1px solid ${color.border};`}
`;

const FrameworkLinkList = styled(TooltipLinkList)`
  border-radius: 0;
  ${(props) =>
    props.isLast &&
    `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

const getFrameworkLogo = (framework) => {
  if (framework === 'rax') return '/frameworks/logo-rax.png';
  return `/frameworks/logo-${framework}.svg`;
};

export function FrameworkSelector({
  currentFramework,
  coreFrameworks,
  communityFrameworks,
  currentVersion,
  slug,
  tooltipProps,
  ...rest
}) {
  const links = [...coreFrameworks, ...communityFrameworks].map((framework) => ({
    framework,
    LinkWrapper: GatsbyLinkWrapper,
    href: buildPathWithVersionAndFramework(slug, currentVersion, framework),
    title: (
      <FrameworkSelectorTitle>
        <img src={getFrameworkLogo(framework)} alt={stylizeFramework(framework)} />
        {stylizeFramework(framework)}
      </FrameworkSelectorTitle>
    ),
  }));
  const coreLinks = links.filter(({ framework }) => coreFrameworks.includes(framework));
  const communityLinks = links.filter(({ framework }) => !coreFrameworks.includes(framework));

  return (
    <Wrapper {...rest}>
      <Framework>Framework: </Framework>
      <WithTooltip
        placement="bottom"
        trigger="click"
        tooltip={
          <>
            <LinkHeading>Core</LinkHeading>
            <FrameworkLinkList links={coreLinks} />
            <LinkHeading withTopBorder>Community</LinkHeading>
            <FrameworkLinkList isLAst links={communityLinks} />
          </>
        }
        as="span"
        {...tooltipProps}
      >
        <FrameworkLink isButton primary withArrow>
          {stylizeFramework(currentFramework)}
        </FrameworkLink>
      </WithTooltip>
    </Wrapper>
  );
}

FrameworkSelector.propTypes = {
  currentFramework: PropTypes.string.isRequired,
  currentVersion: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  coreFrameworks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  communityFrameworks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  slug: PropTypes.string.isRequired,
  tooltipProps: PropTypes.shape({}),
};

FrameworkSelector.defaultProps = {
  currentVersion: null,
  tooltipProps: {},
};
