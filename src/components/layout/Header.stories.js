import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './Header';

storiesOf('Frontpage|layout/Header', module)
  .addDecorator(storyFn => <div style={{ height: '300px' }}>{storyFn()}</div>)
  .add('default', () => <Header />);
