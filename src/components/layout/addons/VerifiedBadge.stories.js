import React from 'react';
import { VerifiedBadge } from './VerifiedBadge';

export default {
  title: 'Frontpage|layout/addons/VerifiedBadge',
  component: VerifiedBadge,
};

const Template = (args) => <VerifiedBadge {...args} />;

export const Official = Template.bind({});
Official.args = {
  appearance: 'official',
  creator: 'Storybook',
};

export const Integrator = Template.bind({});
Integrator.args = {
  appearance: 'integrator',
  creator: 'InVision',
};

export const ClickTrigger = Template.bind({});
ClickTrigger.args = {
  appearance: 'official',
  trigger: 'click',
};
