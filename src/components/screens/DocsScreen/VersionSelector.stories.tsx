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
};

const { coreFrameworks, latestVersion } = useSiteMetadata();
const versions = ['6.0', '6.1', '6.2', '6.3', '6.4.0-beta.11'];

const Template = (args) => <VersionSelector {...args} />;

export const Base = Template.bind({});
Base.args = {
  currentFramework: coreFrameworks[0],
  currentVersion: versions[0],
  latestVersion,
  slug: '/docs/get-started/introduction',
  tooltipProps: { startOpen: true },
  versions,
};

export const LatestSelected = Template.bind({});
LatestSelected.args = {
  ...Base.args,
  currentVersion: latestVersion,
};
