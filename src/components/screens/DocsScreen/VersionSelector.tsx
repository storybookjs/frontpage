import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, Subheading, TooltipLinkList, styles, WithTooltip } from '@storybook/design-system';

import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { buildPathWithVersionAndFramework } from '../../../util/build-path-with-framework';

const { color, typography } = styles;

const Wrapper = styled.div``;

const Version = styled.span`
  font-weight: ${typography.weight.bold};
  color: ${color.dark};
`;

const VersionLink = styled(Link)`
  font-weight: ${typography.weight.bold};

  svg {
    transform: rotate(90deg);
  }
`;

const VersionSelectorTitle = styled.div`
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

const VersionLinkList = styled(TooltipLinkList)`
  border-radius: 0;
`;

function shortenVersion(version) {
  return version && version.match(/^\d+\.\d/)[0];
}

function stylizeVersion(version, latestVersion) {
  if (!version) {
    return `${latestVersion} (latest)`;
  }

  const shortVersion = shortenVersion(version);
  const versionNum = Number(shortVersion);
  const latestVersionNum = Number(latestVersion);

  if (versionNum > latestVersionNum) {
    const [, preReleaseVersion, label] = version.match(/^(\d+\.\d+).*-(\w+)\./);
    return `${preReleaseVersion} (${label})`;
  }

  return shortVersion;
}

export function VersionSelector({
  currentFramework,
  currentVersion,
  latestVersion,
  versions,
  slug,
  tooltipProps,
  ...rest
}) {
  const getVersionLink = (version) => ({
    LinkWrapper: GatsbyLinkWrapper,
    href: buildPathWithVersionAndFramework(slug, shortenVersion(version), currentFramework),
    title: <VersionSelectorTitle>{stylizeVersion(version, latestVersion)}</VersionSelectorTitle>,
  });

  const latestVersionNum = Number(latestVersion);
  const stableVersionLinks = [];
  const preReleaseVersionLinks = [];

  versions.forEach((version) => {
    const link = getVersionLink(version);

    if (Number(shortenVersion(version)) > latestVersionNum) {
      preReleaseVersionLinks.push(link);
    } else {
      stableVersionLinks.push(link);
    }
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
            <VersionLinkList links={stableVersionLinks} />
            <LinkHeading withTopBorder>Pre-release</LinkHeading>
            <VersionLinkList links={preReleaseVersionLinks} />
          </>
        }
        as="span"
        {...tooltipProps}
      >
        <VersionLink isButton appearance="secondary" withArrow>
          {stylizeVersion(currentVersion, latestVersion)}
        </VersionLink>
      </WithTooltip>
    </Wrapper>
  );
}

VersionSelector.propTypes = {
  currentFramework: PropTypes.string.isRequired,
  currentVersion: PropTypes.string.isRequired,
  latestVersion: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  tooltipProps: PropTypes.shape({}),
  versions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

VersionSelector.defaultProps = {
  tooltipProps: {},
};
