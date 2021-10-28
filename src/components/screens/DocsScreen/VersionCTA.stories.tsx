import React from 'react';
import styled from 'styled-components';
import { VersionCTA } from './VersionCTA';
import { versions } from './VersionSelector.stories';

const { coreFrameworks } = require('../../../content/docs/frameworks');

const Wrapper = styled.div`
  padding: 20px;
`;

export default {
  title: 'Frontpage|screens/DocsScreen/VersionCTA',
  component: VersionCTA,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const Template = (args) => <VersionCTA {...args} />;

export const OldVersion = Template.bind({});
OldVersion.args = {
  currentFramework: coreFrameworks[0],
  currentVersion: versions.stable[1].version,
  latestVersion: Number(versions.stable[0].string),
  path: '/docs/get-started/introduction',
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
