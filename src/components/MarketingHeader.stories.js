/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MarketingHeader from './MarketingHeader';

storiesOf('Layout/MarketingHeader', module)
  .addDecorator(storyFn => <div style={{ height: '300px' }}>{storyFn()}</div>)
  .add('default', () => <MarketingHeader />);
