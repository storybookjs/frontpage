import React from 'react';
import { Menu } from '@storybook/components-marketing';

import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import buildPathWithFramework from '../../../util/build-path-with-framework';

const stylizeVersion = ({ label, string }: { label?: string; string: string }) =>
  label ? `${string} (${label})` : string;

interface Stable {
  version: number;
  string: string;
  label?: 'latest';
}

interface PreRelease {
  version: number;
  string: string;
  label: 'alpha' | 'beta' | 'rc' | 'future';
}

export interface Versions {
  stable: Stable[];
  preRelease: PreRelease[];
}

interface VersionSelectorProps {
  framework: string;
  version: number;
  slug: string;
  versions: Versions;
}

export function VersionSelector({ framework, version, versions, slug }: VersionSelectorProps) {
  const getVersionLink = ({ label, string }: { label?: string; string: string }) => ({
    label: stylizeVersion({ label, string }),
    link: { url: buildPathWithFramework(slug, framework, string), LinkWrapper: GatsbyLinkWrapper },
  });

  const stableLinks = versions.stable.map(getVersionLink);
  const preReleaseLinks = versions.preRelease.map(getVersionLink);

  const versionOptions = [
    {
      label: 'stable',
      items: stableLinks,
    },
    {
      label: 'pre-release',
      items: preReleaseLinks,
    },
  ];

  const activeVersion = stylizeVersion(
    [...versions.stable, ...versions.preRelease].find(({ version: v }) => v === version)
  );

  return <Menu label={activeVersion} items={versionOptions} primary />;
}
