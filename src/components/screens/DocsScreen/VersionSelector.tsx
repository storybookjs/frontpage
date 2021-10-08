import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, TooltipLinkList, styles, WithTooltip } from '@storybook/design-system';

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

const VersionLinkList = styled(TooltipLinkList)`
  border-radius: 0;
`;

const SB_NEXT_PACKAGE_VERSION = '6.4.0-beta.6';

function getLabeledVersion(version, latestVersion) {
  if (version === latestVersion) {
    return `${version} (latest)`;
  }

  const versionNum = Number(version);
  const latestVersionNum = Number(latestVersion);

  if (versionNum > latestVersionNum) {
    const [, preReleaseVersion, label] = SB_NEXT_PACKAGE_VERSION.match(/^(\d+\.\d).*-(\w+)\./);
    return `${preReleaseVersion} (${label})`;
  }

  return version;
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
  const links = versions.map((version) => ({
    LinkWrapper: GatsbyLinkWrapper,
    href: buildPathWithVersionAndFramework(slug, version, currentFramework),
    title: <VersionSelectorTitle>{getLabeledVersion(version, latestVersion)}</VersionSelectorTitle>,
  }));

  return (
    <Wrapper {...rest}>
      <Version>Version: </Version>
      <WithTooltip
        placement="bottom"
        trigger="click"
        tooltip={<VersionLinkList links={links} />}
        as="span"
        {...tooltipProps}
      >
        <VersionLink isButton appearance="secondary" withArrow>
          {getLabeledVersion(currentVersion, latestVersion)}
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
