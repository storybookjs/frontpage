import React from 'react';
import { styled } from '@storybook/theming';
import { VersionSelector } from './VersionSelector';
import { pageContext } from '../../layout/DocsLayout.stories';

const { coreFrameworks } = require('../../../content/docs/frameworks');

const { versions } = pageContext;

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

const Template = (args) => <VersionSelector {...args} />;

export const Base = Template.bind({});
Base.args = {
  version: versions.stable[0].version,
  versions,
  framework: coreFrameworks[0],
  slug: '/docs/get-started/introduction',
  tooltipProps: { startOpen: true },
};

export const NonLatestSelected = Template.bind({});
NonLatestSelected.args = {
  ...Base.args,
  version: versions.stable[1].version,
};

export const NoPreReleases = Template.bind({});
NoPreReleases.args = {
  ...Base.args,
  versions: {
    ...versions,
    preRelease: [],
  },
};
