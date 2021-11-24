import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link, Subheading, TooltipLinkList, styles, WithTooltip } from '@storybook/design-system';

import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import buildPathWithFramework from '../../../util/build-path-with-framework';

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

const stylizeVersion = ({ label, string }) => (label ? `${string} (${label})` : string);

export function VersionSelector({ framework, version, versions, slug, tooltipProps, ...rest }) {
  const getVersionLink = ({ label, string }) => ({
    LinkWrapper: GatsbyLinkWrapper,
    href: buildPathWithFramework(slug, framework, string),
    title: stylizeVersion({ label, string }),
  });

  const stableLinks = versions.stable.map(getVersionLink);
  const preReleaseLinks = versions.preRelease.map(getVersionLink);

  return (
    <Wrapper {...rest}>
      <Version>Version: </Version>
      <WithTooltip
        placement="bottom"
        trigger="click"
        tooltip={
          <>
            <LinkHeading>Stable</LinkHeading>
            <VersionLinkList links={stableLinks} />
            {preReleaseLinks.length > 0 && (
              <>
                <LinkHeading withTopBorder>Pre-release</LinkHeading>
                <VersionLinkList links={preReleaseLinks} />
              </>
            )}
          </>
        }
        as="span"
        {...tooltipProps}
      >
        <VersionLink isButton primary withArrow>
          {stylizeVersion(
            [...versions.stable, ...versions.preRelease].find(({ version: v }) => v === version)
          )}
        </VersionLink>
      </WithTooltip>
    </Wrapper>
  );
}

VersionSelector.propTypes = {
  framework: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  tooltipProps: PropTypes.shape({}),
  versions: PropTypes.shape({
    stable: PropTypes.arrayOf(
      PropTypes.shape({
        version: PropTypes.number.isRequired,
        string: PropTypes.string.isRequired,
        label: PropTypes.oneOf(['latest']),
      }).isRequired
    ).isRequired,
    preRelease: PropTypes.arrayOf(
      PropTypes.shape({
        version: PropTypes.number.isRequired,
        string: PropTypes.string.isRequired,
        label: PropTypes.oneOf(['alpha', 'beta', 'rc']).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

VersionSelector.defaultProps = {
  tooltipProps: {},
};
