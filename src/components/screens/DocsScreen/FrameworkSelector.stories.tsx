import React from 'react';
import { styled } from '@storybook/theming';
import { within, userEvent } from '@storybook/testing-library';
import { FrameworkSelector } from './FrameworkSelector';
import useSiteMetadata from '../../../../.storybook/useSiteMetadata';

// The Wrapper helps capture the tooltip contents in the snapshot
const Wrapper = styled.span`
  display: inline-block;
  width: 225px;
  height: 510px;
`;

export default {
  title: 'Screens/DocsScreen/FrameworkSelector',
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
};
Base.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const menuButton = canvas.getByRole('button', { name: /React/i });
  await userEvent.click(menuButton);
  await userEvent.keyboard('{arrowdown}');
};
