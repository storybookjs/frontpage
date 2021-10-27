import React from 'react';
import styled from 'styled-components';
import { FrameworkSelector } from './FrameworkSelector';

const { coreFrameworks, communityFrameworks } = require('../../../content/docs/frameworks');

// The Wrapper helps capture the tooltip contents in the snapshot
const Wrapper = styled.span`
  display: inline-block;
  width: 225px;
  height: 510px;
`;

export default {
  title: 'Frontpage|screens/DocsScreen/FrameworkSelector',
  component: FrameworkSelector,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const Template = (args) => <FrameworkSelector {...args} />;

export const Base = Template.bind({});
Base.args = {
  coreFrameworks,
  communityFrameworks,
  currentFramework: coreFrameworks[0],
  path: '/docs/get-started/introduction',
  tooltipProps: { startOpen: true },
};
