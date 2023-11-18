import React from 'react';
import { styled } from '@storybook/theming';
import { within, userEvent } from '@storybook/testing-library';
import { VersionSelector } from './VersionSelector';
import { pageContext } from '../../layout/DocsLayout/DocsLayout.stories';

const { versions } = pageContext;

// The Wrapper helps capture the tooltip contents in the snapshot
const Wrapper = styled.span`
  display: inline-block;
  width: 225px;
  height: 510px;
`;

export default {
  title: 'Screens/DocsScreen/VersionSelector',
  component: VersionSelector,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const Template = (args) => <VersionSelector {...args} />;

export const Base = Template.bind({});
Base.args = {
  version: versions.stable[0].version,
  versions,
  slug: '/docs/get-started/install',
};
Base.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const menuButton = canvas.getByRole('button', { name: /6.3/i });
  await userEvent.click(menuButton);
  await userEvent.keyboard('{arrowdown}');
};

export const NonLatestSelected = Template.bind({});
NonLatestSelected.args = {
  ...Base.args,
  version: versions.stable[1].version,
};
NonLatestSelected.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const menuButton = canvas.getByRole('button', { name: /6.2/i });
  await userEvent.click(menuButton);
  await userEvent.keyboard('{arrowdown}');
};

export const NoPreReleases = Template.bind({});
NoPreReleases.args = {
  ...Base.args,
  versions: {
    ...versions,
    preRelease: [],
  },
};
NoPreReleases.play = Base.play;
