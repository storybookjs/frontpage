import React from 'react';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { styled } from '@storybook/theming';
import { DocsSearch } from './DocsSearch';

const { coreFrameworks } = require('../../../content/docs/frameworks');

// Mimicing Sidebar
const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  padding: 20px;
  width: 250px;

  & > * {
    flex: 1;
  }
`;

// To ensure Chromatic captures the full modal
const OpenWrapper = styled(Wrapper)`
  min-height: 300px;
  max-width: 100vw;
  width: 800px;

  & > * {
    max-width: 250px;
  }
`;

export default {
  title: 'Frontpage|screens/DocsScreen/DocsSearch',
  component: DocsSearch,
  argTypes: {
    visible: { control: false },
  },
};

const Template = (args) => <DocsSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  framework: coreFrameworks[0],
  visible: true,
};
Default.decorators = [(storyFn) => <Wrapper>{storyFn()}</Wrapper>];

export const Open = Template.bind({});
Open.args = Default.args;
Open.decorators = [(storyFn) => <OpenWrapper>{storyFn()}</OpenWrapper>];
Open.parameters = {
  chromatic: {
    viewports: [800],
  },
};
Open.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const search = await canvas.findByRole('button', { name: /search docs/i });

  await userEvent.click(search);
};
