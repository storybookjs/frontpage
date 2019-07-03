/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureNotFoundScreen } from './NotFoundScreen';
import { allMediumPost } from '../../layout/Footer.stories';

storiesOf('Frontpage|screens/NotFoundScreen/NotFoundScreen', module).add('default', () => (
  <PureNotFoundScreen data={{ allMediumPost }} />
));
