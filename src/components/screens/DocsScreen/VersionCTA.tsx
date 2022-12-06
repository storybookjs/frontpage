import React from 'react';
import { styled } from '@storybook/theming';
import { Badge, OutlineCTA, styles } from '@storybook/design-system';
import { startCase } from 'lodash';
import GatsbyLink from '../../basics/GatsbyLink';
import buildPathWithFramework from '../../../util/build-path-with-framework';
import { Versions } from './VersionSelector';

const { breakpoint } = styles;
interface VersionCTAProps {
  framework: string;
  latestVersion: number;
  latestVersionString: string;
  slug: string;
  version: number;
  versions: Versions;
}

const StyledOutlineCTA = styled(OutlineCTA)`
  //override styles from design system
  @media (min-width: ${breakpoint}px) {
    padding-left: 15px;
    padding-right: 10px;
  }

  ${Badge} {
    // with inline spacing this yields about 10px between badge and text
    margin-right: 2px;
  }
`;
export function VersionCTA({
  framework,
  version,
  latestVersion,
  latestVersionString,
  slug,
  versions,
  ...rest
}: VersionCTAProps) {
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
    <StyledOutlineCTA
      action={
        <GatsbyLink to={buildPathWithFramework(slug, framework, latestVersionString)} withArrow>
          View latest docs
        </GatsbyLink>
      }
      badge={badge}
      {...rest}
    >
      {message}
    </StyledOutlineCTA>
  );
}
