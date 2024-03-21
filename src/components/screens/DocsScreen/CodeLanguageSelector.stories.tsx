import React from 'react';
import { styled } from '@storybook/theming';
import { within, userEvent, expect } from '@storybook/test';
import { CodeLanguageSelector } from './CodeLanguageSelector';
import { DocsContextProvider } from './DocsContext';

// The Wrapper helps capture the tooltip contents in the snapshot
const Wrapper = styled.span`
  display: inline-block;
  width: 225px;
  height: 510px;
`;

export default {
  title: 'Screens/DocsScreen/CodeLanguageSelector',
  component: CodeLanguageSelector,
  args: {
    renderer: 'react',
  },
  decorators: [
    (storyFn, { args: { renderer } }) => (
      <DocsContextProvider renderer={renderer}>
        <Wrapper>{storyFn()}</Wrapper>
      </DocsContextProvider>
    ),
  ],
};

const Template = (args) => <CodeLanguageSelector {...args} />;

export const Base = Template.bind({});
Base.args = {};
Base.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const menuButton = canvas.getByRole('button', { name: /TypeScript/i });
  await userEvent.click(menuButton);
  await userEvent.keyboard('{arrowdown}');
};

// Note: Until 7.0 is stable, this snapshot will render nothing (as expected)
export const Angular = Template.bind({});
Angular.args = {
  renderer: 'angular',
};
Angular.parameters = {
  chromatic: { disableSnapshot: true },
};
Angular.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const menuButton = canvas.getByRole('button', { name: /TypeScript/i });
  // SB's jest types don't include jest-dom
  await expect(menuButton).not.toBeInTheDocument();
};
