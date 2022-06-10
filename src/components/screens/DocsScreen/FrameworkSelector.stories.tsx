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

// eslint-disable-next-line react-hooks/rules-of-hooks
const { coreFrameworks, communityFrameworks } = useSiteMetadata();

const Template = (args) => <FrameworkSelector {...args} />;

export const Base = Template.bind({});
Base.args = {
  framework: coreFrameworks[0],
  coreFrameworks,
  communityFrameworks,
  slug: '/docs/get-started/introduction',
  tooltipProps: { startOpen: true },
};
