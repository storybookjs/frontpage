import React from 'react';
import { styled } from '@storybook/theming';
import { FrameworkSelector } from './FrameworkSelector';
import useSiteMetadata from '../../../../.storybook/useSiteMetadata';

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

const { coreFrameworks, communityFrameworks } = useSiteMetadata();

const Template = (args) => <FrameworkSelector {...args} />;

export const Base = Template.bind({});
Base.args = {
  coreFrameworks,
  communityFrameworks,
  currentFramework: coreFrameworks[0],
  slug: '/slug',
  tooltipProps: { startOpen: true },
};
