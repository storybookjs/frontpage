import React from 'react';
import PropTypes from 'prop-types';
import { Badge, OutlineCTA } from '@storybook/design-system';
import { startCase } from 'lodash';
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
  let message = `You're viewing older docs for version ${currentVersion}.`;
  let badge = <Badge status="positive">New</Badge>;

  if (Number(currentVersion) > latestVersion) {
    const { label, string } = versions.preRelease.find(({ version }) => version === currentVersion);
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
        <GatsbyLink to={buildPathWithVersionAndFramework(slug, null, currentFramework)} withArrow>
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
  currentFramework: PropTypes.string.isRequired,
  currentVersion: PropTypes.string.isRequired,
  latestVersion: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  versions: VersionSelector.propTypes.versions,
};
