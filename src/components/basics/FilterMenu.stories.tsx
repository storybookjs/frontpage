import * as React from 'react';

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
