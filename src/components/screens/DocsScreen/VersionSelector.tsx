import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, Subheading, TooltipLinkList, styles, WithTooltip } from '@storybook/design-system';

import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { buildPathWithVersionAndFramework } from '../../../util/build-path-with-framework';

const { breakpoint, color, typography } = styles;

const Wrapper = styled.div`
  font-size: ${typography.size.s2}px;
`;

const Version = styled.span`
  color: ${color.darker};

  display: none;
  @media (min-width: ${breakpoint * 1}px) {
    display: inline;
  }
`;

const VersionLink = styled(Link)`
  svg {
    transform: rotate(90deg);
  }
`;

const VersionSelectorTitle = styled.div`
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

const VersionLinkList = styled(TooltipLinkList)`
  border-radius: 0;
`;

export function VersionSelector({
  currentFramework,
  currentVersion,
  versions,
  slug,
  tooltipProps,
  ...rest
}) {
  const getVersionLink = ({ version, stylized }) => ({
    LinkWrapper: GatsbyLinkWrapper,
    href: buildPathWithVersionAndFramework(slug, version, currentFramework),
    title: <VersionSelectorTitle>{stylized}</VersionSelectorTitle>,
  });

  return (
    <Wrapper {...rest}>
      <Version>Version: </Version>
      <WithTooltip
        placement="bottom"
        trigger="click"
        tooltip={
          <>
            <LinkHeading>Stable</LinkHeading>
            <VersionLinkList links={versions.stable.map(getVersionLink)} />
            <LinkHeading withTopBorder>Pre-release</LinkHeading>
            <VersionLinkList links={versions.preRelease.map(getVersionLink)} />
          </>
        }
        as="span"
        {...tooltipProps}
      >
        <VersionLink isButton primary withArrow>
          {
            [...versions.stable, ...versions.preRelease].find(
              ({ version }) => version === currentVersion
            ).stylized
          }
        </VersionLink>
      </WithTooltip>
    </Wrapper>
  );
}

VersionSelector.propTypes = {
  currentFramework: PropTypes.string.isRequired,
  currentVersion: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  slug: PropTypes.string.isRequired,
  tooltipProps: PropTypes.shape({}),
  versions: PropTypes.shape({
    stable: PropTypes.arrayOf(
      PropTypes.shape({
        version: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
        number: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
        stylized: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    preRelease: PropTypes.arrayOf(
      PropTypes.shape({
        version: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        stylized: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

VersionSelector.defaultProps = {
  currentVersion: null,
  tooltipProps: {},
};
