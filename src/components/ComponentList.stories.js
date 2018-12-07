/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import ComponentList from './ComponentList';

storiesOf('Screens/UseCasesScreen/ComponentList', module).add('full', () => <ComponentList />);
