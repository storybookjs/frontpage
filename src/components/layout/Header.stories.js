import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './Header';

storiesOf('layout/Header', module).add('default', () => <Header siteTitle="Storybook" />);
