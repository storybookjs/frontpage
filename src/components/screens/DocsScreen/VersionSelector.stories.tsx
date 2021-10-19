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
    { version: '6.0', number: 6.0, stylized: '6.0' },
    { version: '6.1', number: 6.1, stylized: '6.1' },
    { version: '6.2', number: 6.2, stylized: '6.2' },
    { version: null, number: null, stylized: '6.3 (latest)' },
  ],
  preRelease: [{ version: '6.4', number: 6.4, stylized: '6.4 (beta)' }],
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
