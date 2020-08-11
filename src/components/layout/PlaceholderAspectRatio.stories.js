import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import PlaceholderAspectRatio from './PlaceholderAspectRatio';

const Placeholder = styled(PlaceholderAspectRatio)`
  background: green;
`;

storiesOf('Frontpage|layout/PlaceholderAspectRatio', module)
  .addDecorator(storyFn => (
    <div style={{ background: 'papayawhip', width: '400px', height: '400px' }}>{storyFn()}</div>
  ))
  .add('default', () => <Placeholder ratio={0.75} />);
