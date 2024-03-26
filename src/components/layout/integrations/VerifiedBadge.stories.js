import React from 'react';
import { VerifiedBadge } from './VerifiedBadge';

export default {
  title: 'Integrations Catalog/Layout/Addons/VerifiedBadge',
  component: VerifiedBadge,
};

export const Official = {
  args: {
    appearance: 'official',
    creator: 'Storybook',
  },
};

export const Integrator = {
  args: {
    appearance: 'integrators',
    creator: 'InVision',
  },
};

export const ClickTrigger = {
  args: {
    appearance: 'official',
    trigger: 'click',
  },
};
