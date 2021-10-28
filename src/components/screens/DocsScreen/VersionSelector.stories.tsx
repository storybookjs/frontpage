import React from 'react';
import styled from 'styled-components';
import { VersionSelector } from './VersionSelector';

const { coreFrameworks } = require('../../../content/docs/frameworks');

// The Wrapper helps capture the tooltip contents in the snapshot
const Wrapper = styled.span`
  display: inline-block;
  width: 225px;
  height: 510px;
`;

export default {
  title: 'Frontpage|screens/DocsScreen/VersionSelector',
  component: VersionSelector,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
  excludeStories: ['versions'],
};

export const versions = {
  stable: [
    { version: null, label: 'latest', string: '6.3' },
    { version: '6.2', string: '6.2' },
    { version: '6.1', string: '6.1' },
    { version: '6.0', string: '6.0' },
  ],
  preRelease: [{ version: '6.4', label: 'beta', string: '6.4' }],
};

const Template = (args) => <VersionSelector {...args} />;

export const Base = Template.bind({});
Base.args = {
  currentFramework: coreFrameworks[0],
  currentVersion: versions.stable[0].version,
  path: '/docs/get-started/introduction',
  tooltipProps: { startOpen: true },
  versions,
};

export const NonLatestSelected = Template.bind({});
NonLatestSelected.args = {
  ...Base.args,
  currentVersion: versions.stable[1].version,
};

export const NoPreReleases = Template.bind({});
NoPreReleases.args = {
  ...Base.args,
  versions: {
    ...versions,
    preRelease: [],
  },
};
