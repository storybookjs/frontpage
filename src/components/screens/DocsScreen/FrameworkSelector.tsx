import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, Subheading, TooltipLinkList, styles, WithTooltip } from '@storybook/design-system';

import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import buildPathWithFramework from '../../../util/build-path-with-framework';
import stylizeFramework from '../../../util/stylize-framework';

const { color, typography } = styles;

const Wrapper = styled.div``;

const Framework = styled.span`
  font-weight: ${typography.weight.bold};
  color: ${color.dark};
`;

const FrameworkLink = styled(Link)`
  font-weight: ${typography.weight.bold};
`;

const FrameworkSelectorTitle = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 17px;
    height: 16px;
    margin-right: 9px;
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
  border-bottom: 1px solid #eee;
  ${(props) => props.withTopBorder && `border-top: 1px solid #eee;`}
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

const coreFrameworks = ['react', 'vue', 'angular', 'ember', 'html'];

export function FrameworkSelector({ currentFramework, frameworks, slug, tooltipProps, ...rest }) {
  const links = frameworks.map((framework) => ({
    framework,
    LinkWrapper: GatsbyLinkWrapper,
    href: buildPathWithFramework(slug, framework),
    title: (
      <FrameworkSelectorTitle>
        <img src={`/frameworks/logo-${framework}.svg`} alt={stylizeFramework(framework)} />
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
        <FrameworkLink isButton appearance="secondary">
          {stylizeFramework(currentFramework)}
        </FrameworkLink>
      </WithTooltip>
    </Wrapper>
  );
}

FrameworkSelector.propTypes = {
  currentFramework: PropTypes.string.isRequired,
  frameworks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  slug: PropTypes.string.isRequired,
  tooltipProps: PropTypes.shape({}),
};

FrameworkSelector.defaultProps = {
  tooltipProps: {},
};
