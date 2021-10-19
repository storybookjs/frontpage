import React from 'react';
import PropTypes from 'prop-types';
import { Badge, OutlineCTA } from '@storybook/design-system';
import GatsbyLink from '../../basics/GatsbyLink';
import { buildPathWithVersionAndFramework } from '../../../util/build-path-with-framework';

export function VersionCTA({ currentFramework, currentVersion, latestVersion, slug, ...rest }) {
  const isPreRelease = Number(currentVersion) > latestVersion;
  const versionMessage = isPreRelease
    ? `These docs are for pre-release version ${currentVersion}. Docs are available for latest stable version ${latestVersion}.`
    : `These docs are for version ${currentVersion}. Newer docs are available for version ${latestVersion}.`;

  return (
    <OutlineCTA
      action={
        <GatsbyLink to={buildPathWithVersionAndFramework(slug, null, currentFramework)} withArrow>
          Go to latest docs
        </GatsbyLink>
      }
      badge={<Badge status="positive">New</Badge>}
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
};
