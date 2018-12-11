import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import PageLayout from './PageLayout';

storiesOf('layout/PageLayout', module).add('default', () => <PageLayout>children</PageLayout>);
