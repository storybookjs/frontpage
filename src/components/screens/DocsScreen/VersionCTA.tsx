import React from 'react';
import PropTypes from 'prop-types';
import { Badge, OutlineCTA } from '@storybook/design-system';
import GatsbyLink from '../../basics/GatsbyLink';
import { buildPathWithVersionAndFramework } from '../../../util/build-path-with-framework';
import { VersionSelector } from './VersionSelector';

export function VersionCTA({
  currentFramework,
  currentVersion,
  latestVersion,
  slug,
  versions,
  ...rest
}) {
  const isPreRelease = Number(currentVersion) > latestVersion;
  const versionMessage = isPreRelease
    ? `You're viewing docs for a pre-release version ${
        versions.preRelease.find(({ version }) => version === currentVersion).stylized
      } of Storybook.`
    : `You're viewing docs for an older version ${currentVersion} of Storybook.`;

  return (
    <OutlineCTA
      action={
        <GatsbyLink to={buildPathWithVersionAndFramework(slug, null, currentFramework)} withArrow>
          View latest docs
        </GatsbyLink>
      }
      badge={<Badge status={isPreRelease ? 'warning' : 'positive'}>New</Badge>}
      {...rest}
    >
      {versionMessage}
    </OutlineCTA>
  );
}

VersionCTA.propTypes = {
  currentFramework: PropTypes.string.isRequired,
  currentVersion: PropTypes.string.isRequired,
  latestVersion: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  versions: VersionSelector.propTypes.versions,
};
