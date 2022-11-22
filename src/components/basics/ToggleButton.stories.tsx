import { ComponentStoryObj, ComponentMeta } from '@storybook/react';

import { ToggleButton } from './ToggleButton';

export default {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  args: {
    children: 'Label',
  },
} as ComponentMeta<typeof ToggleButton>;

export const Default: ComponentStoryObj<typeof ToggleButton> = {};

export const Active: ComponentStoryObj<typeof ToggleButton> = {
  args: {
    active: true,
  },
};

export const Disabled: ComponentStoryObj<typeof ToggleButton> = {
  args: {
    disabled: true,
  },
};

export const ActiveAndDisabled: ComponentStoryObj<typeof ToggleButton> = {
  args: {
    active: true,
    disabled: true,
  },
};
