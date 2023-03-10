import React from 'react';
import { styled } from '@storybook/theming';
import { within, userEvent } from '@storybook/testing-library';
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
    framework: 'react',
  },
  decorators: [
    (storyFn, { args: { framework } }) => (
      <DocsContextProvider framework={framework}>
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
