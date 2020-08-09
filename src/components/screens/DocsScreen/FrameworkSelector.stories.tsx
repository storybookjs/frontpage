import React from 'react';
import styled from 'styled-components';
import { FrameworkSelector } from './FrameworkSelector';

// The Wrapper helps capture the tooltip contents in the snapshot
const Wrapper = styled.span`
  display: inline-block;
  width: 225px;
  height: 450px;
`;

const frameworksWithIcons = [
  'react',
  'vue',
  'angular',
  'html',
  'ember',
  'svelte',
  'riot',
  'mithril',
  'marko',
  'react-native',
  'rax',
  'preact',
];

export default {
  title: 'Frontpage|screens/DocsScreen/FrameworkSelector',
  component: FrameworkSelector,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const Template = (args) => <FrameworkSelector {...args} />;

export const Base = Template.bind({});
Base.args = {
  frameworks: frameworksWithIcons,
  currentFramework: frameworksWithIcons[0],
  slug: '/slug',
  tooltipProps: { startOpen: true },
};
