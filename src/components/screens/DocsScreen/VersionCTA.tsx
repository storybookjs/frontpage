import React from 'react';
import PropTypes from 'prop-types';
import { Badge, OutlineCTA } from '@storybook/design-system';
import { startCase } from 'lodash';
import GatsbyLink from '../../basics/GatsbyLink';
import buildPathWithFramework from '../../../util/build-path-with-framework';
import { VersionSelector } from './VersionSelector';

export function VersionCTA({
  framework,
  version,
  latestVersion,
  latestVersionString,
  slug,
  versions,
  ...rest
}) {
  let message = `You're viewing older docs for version ${version.toFixed(1)}.`;
  let badge = <Badge status="positive">New</Badge>;

  if (version > latestVersion) {
    const { label, string } = versions.preRelease.find(({ version: v }) => v === version);
    message = `You're viewing pre-release docs for version ${string}.`;
    badge = (
      <Badge status="warning">
        {label === 'rc' ? (
          <abbr title="Release Candidate" style={{ textDecoration: 'none' }}>
            {label.toUpperCase()}
          </abbr>
        ) : (
          startCase(label)
        )}
      </Badge>
    );
  }

  return (
    <OutlineCTA
      action={
        <GatsbyLink to={buildPathWithFramework(slug, framework, latestVersionString)} withArrow>
          View latest docs
        </GatsbyLink>
      }
      badge={badge}
      {...rest}
    >
      {message}
    </OutlineCTA>
  );
}

VersionCTA.propTypes = {
  framework: PropTypes.string.isRequired,
  latestVersion: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
  versions: VersionSelector.propTypes.versions,
};
