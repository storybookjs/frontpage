import * as React from 'react';
import { userEvent, within } from '@storybook/testing-library';

import { FilterMenu, Value } from './FilterMenu';

export default {
  title: 'Components/FilterMenu',
  component: FilterMenu,
  args: {
    items: [
      { title: 'One', value: 'one' },
      { title: 'Two', value: 'two' },
      { title: 'Three', value: 'three' },
    ],
    label: 'Label',
    value: [],
  },
  decorators: [
    (Story) => (
      <div style={{ height: '300px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { disable: true },
  },
};

export const Default = {};

export const WithSingleValue = {
  args: {
    multiple: false,
    startOpen: true,
    value: ['one'],
  },
};

export const WithMultipleValues = {
  args: {
    multiple: true,
    startOpen: true,
    value: ['one', 'two'],
  },
};

const Stateful = ({ ...args }) => {
  const [value, setValue] = React.useState([]);

  return (
    <FilterMenu
      {...args}
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
    />
  );
};

export const SelectAnItem = {
  args: {
    multiple: false,
  },
  render: (args) => <Stateful {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const menuButton = await canvas.findByRole('button', { name: 'Label' });
    await userEvent.click(menuButton);

    const menuItem = await canvas.findByText('One');
    await userEvent.click(menuItem);
  },
};

export const SelectMultipleItems = {
  args: {
    multiple: true,
  },
  render: (args) => <Stateful {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const menuButton = await canvas.findByRole('button', { name: 'Label' });
    await userEvent.click(menuButton);

    const menuItem1 = await canvas.findByText('One');
    await userEvent.click(menuItem1);

    const menuItem2 = await canvas.findByText('Two');
    await userEvent.click(menuItem2);
  },
};

export const ClearFilter = {
  args: {
    includeClearButton: true,
  },
  render: (args) => <Stateful {...args} />,
  play: async (context) => {
    const { canvasElement } = context;

    await SelectMultipleItems.play(context);

    const canvas = within(canvasElement);

    const clearButton = await canvas.findByRole('button', {
      name: 'Clear filter',
    });
    await userEvent.click(clearButton);
  },
};
