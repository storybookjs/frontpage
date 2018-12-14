/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './Header';

storiesOf('layout/Header', module)
  .addDecorator(storyFn => <div style={{ height: '300px' }}>{storyFn()}</div>)
  .add('default', () => <Header />);
