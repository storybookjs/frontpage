import React from 'react';
import styled from 'styled-components';
import { VersionCTA } from './VersionCTA';
import useSiteMetadata from '../../../../.storybook/useSiteMetadata';
import { versions } from './VersionSelector.stories';

const Wrapper = styled.div`
  padding: 20px;
`;

export default {
  title: 'Frontpage|screens/DocsScreen/VersionCTA',
  component: VersionCTA,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const { coreFrameworks } = useSiteMetadata();

const Template = (args) => <VersionCTA {...args} />;

export const OldVersion = Template.bind({});
OldVersion.args = {
  currentFramework: coreFrameworks[0],
  currentVersion: versions.stable[0].version,
  latestVersion: versions.stable[versions.stable.length - 1].string,
  slug: '/docs/get-started/introduction',
  versions,
};

export const PreReleaseVersion = Template.bind({});
PreReleaseVersion.args = {
  ...OldVersion.args,
  currentVersion: versions.preRelease[0].version,
};

export const PreReleaseRCVersion = Template.bind({});
PreReleaseRCVersion.args = {
  ...PreReleaseVersion.args,
  versions: {
    ...versions,
    preRelease: [{ ...versions.preRelease[0], label: 'rc' }],
  },
};
