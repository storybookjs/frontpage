import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import ComponentItem from './ComponentItem';

const Item = styled(ComponentItem)`
  display: inline-block;
  flex: 0 1 16.66%;
  padding: 0px 10px 20px;
  min-width: 150px;
`;

storiesOf('Frontpage|screens/UseCasesScreen/ComponentItem', module)
  .add('loading', () => <Item loading />)
  .add('default', () => <Item imageUrl="images/use-cases/formidable/1.png" />);
