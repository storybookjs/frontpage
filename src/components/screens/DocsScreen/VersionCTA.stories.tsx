import React from 'react';
import styled from 'styled-components';
import { VersionCTA } from './VersionCTA';
import { pageContext } from '../../layout/DocsLayout.stories';

const { coreFrameworks } = require('../../../content/docs/frameworks');

const { versions } = pageContext;

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
  framework: coreFrameworks[0],
  version: versions.stable[1].version,
  latestVersion: Number(versions.stable[0].string),
  versions,
  slug: '/docs/get-started/introduction',
};

export const PreReleaseVersion = Template.bind({});
PreReleaseVersion.args = {
  ...OldVersion.args,
  version: versions.preRelease[0].version,
};

export const PreReleaseRCVersion = Template.bind({});
PreReleaseRCVersion.args = {
  ...PreReleaseVersion.args,
  versions: {
    ...versions,
    preRelease: [{ ...versions.preRelease[0], label: 'rc' }],
  },
};
