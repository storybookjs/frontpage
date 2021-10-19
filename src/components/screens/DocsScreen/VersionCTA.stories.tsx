import React from 'react';
import styled from 'styled-components';
import { VersionCTA } from './VersionCTA';
import useSiteMetadata from '../../../../.storybook/useSiteMetadata';

const Wrapper = styled.div`
  padding: 20px;
`;

export default {
  title: 'Frontpage|screens/DocsScreen/VersionCTA',
  component: VersionCTA,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const { coreFrameworks, latestVersion } = useSiteMetadata();

const Template = (args) => <VersionCTA {...args} />;

export const OldVersion = Template.bind({});
OldVersion.args = {
  currentFramework: coreFrameworks[0],
  currentVersion: '6.0',
  latestVersion,
  slug: '/docs/get-started/introduction',
};

export const PreReleaseVersion = Template.bind({});
PreReleaseVersion.args = {
  currentFramework: coreFrameworks[0],
  currentVersion: `${(latestVersion + 0.1).toFixed(1)}`,
  latestVersion,
  slug: '/docs/get-started/introduction',
};
