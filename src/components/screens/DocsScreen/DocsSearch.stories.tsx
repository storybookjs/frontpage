import React from 'react';
import { userEvent, within } from '@storybook/testing-library';
import { styled } from '@storybook/theming';
import { DocsSearch } from './DocsSearch';

const { coreFrameworks } = require('../../../content/docs/frameworks');

// Mimicing Sidebar
const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  max-width: 250px;

  & > * {
    flex: 1;
  }
`;

export default {
  title: 'Frontpage|screens/DocsScreen/DocsSearch',
  component: DocsSearch,
  argTypes: {
    visible: { control: false },
  },
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const Template = (args) => <DocsSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  framework: coreFrameworks[0],
  visible: true,
};

export const Open = Template.bind({});
Open.args = Default.args;
Open.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const search = await canvas.findByRole('button', { name: /search docs/i });

  await userEvent.click(search);
};
