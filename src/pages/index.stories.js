import React from 'react';
import { storiesOf } from '@storybook/react';

import IndexPage from './index';

//TODO allow Gatsby pages to render in SB

storiesOf('Index', module).add('default', () => <IndexPage />);
