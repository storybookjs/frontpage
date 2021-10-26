import React from 'react';
import styled from 'styled-components';
import { VersionSelector } from './VersionSelector';
import useSiteMetadata from '../../../../.storybook/useSiteMetadata';

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

const { coreFrameworks } = useSiteMetadata();
export const versions = {
  stable: [
    { version: '6.0', number: 6.0, string: '6.0' },
    { version: '6.1', number: 6.1, string: '6.1' },
    { version: '6.2', number: 6.2, string: '6.2' },
    { version: null, label: 'latest', number: 6.3, string: '6.3' },
  ],
  preRelease: [{ version: '6.4', label: 'beta', number: 6.4, string: '6.4' }],
};

const Template = (args) => <VersionSelector {...args} />;

export const Base = Template.bind({});
Base.args = {
  currentFramework: coreFrameworks[0],
  currentVersion: versions.stable[0].version,
  slug: '/docs/get-started/introduction',
  tooltipProps: { startOpen: true },
  versions,
};

export const LatestSelected = Template.bind({});
LatestSelected.args = {
  ...Base.args,
  currentVersion: null,
};
