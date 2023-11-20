import React from 'react';
import { styled } from '@storybook/theming';
import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';

import { LanguageSelector } from './LanguageSelector';

// The Wrapper helps capture the tooltip contents in the snapshot
const Wrapper = styled.span`
  display: inline-block;
  width: 225px;
  height: 510px;
`;

export default {
  title: 'Basics/LanguageSelector',
  component: LanguageSelector,
  args: {
    items: [
      { id: 'js', label: 'JavaScript' },
      { id: 'ts', label: 'TypeScript' },
      { id: 'ts-4-9', label: 'TypeScript 4.9' },
    ],
    value: 'typescript',
  },
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};

const Template = ({ value: initialValue, ...args }) => {
  const [value, setValue] = React.useState(initialValue);
  return <LanguageSelector value={value} onChange={setValue} {...args} />;
};
export const Base = Template.bind({});

export const Open = Template.bind({});
Open.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const menuButton = canvas.getByRole('button', { name: /TypeScript/i });
  await userEvent.click(menuButton);
  await userEvent.keyboard('{arrowdown}');
};
