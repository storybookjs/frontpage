import React from 'react';
import { Stat } from './Stat';

export default {
  title: 'Frontpage|basics/Stat',
  component: Stat,
};

const Template = (args) => <Stat {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: '1480+',
  text: 'Contributors',
  noPlural: true,
};
Default.parameters = {
  backgrounds: { default: 'dark' },
};
