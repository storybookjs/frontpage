/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import SteeringCommittee from './SteeringCommittee';

storiesOf('Frontpage|screens/TeamScreen/SteeringCommittee', module).add('default', () => (
  <SteeringCommittee />
));
