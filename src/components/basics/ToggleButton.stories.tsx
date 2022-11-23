import { ToggleButton } from './ToggleButton';

export default {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  args: {
    children: 'Label',
  },
};

export const Default = {};

export const Active = {
  args: {
    active: true,
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const ActiveAndDisabled = {
  args: {
    active: true,
    disabled: true,
  },
};
