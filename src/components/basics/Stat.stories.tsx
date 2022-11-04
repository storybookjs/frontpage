import React from 'react';
import { Stat as StatComponent } from './Stat';

export default {
  title: 'Basics/Stat',
  component: StatComponent,
};

const Template = (args) => <StatComponent {...args} />;

export const Stat = Template.bind({});
Stat.args = {
  count: '1480+',
  text: 'Contributors',
  noPlural: true,
};
Stat.parameters = {
  backgrounds: { default: 'dark' },
};
