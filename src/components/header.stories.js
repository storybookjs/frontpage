import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './Header';

storiesOf('Layout/Header', module).add('default', () => <Header siteTitle="Storybook" />);
