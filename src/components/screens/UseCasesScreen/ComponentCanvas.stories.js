import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ComponentCanvas from './ComponentCanvas';

const onSelectIndex = action('onSelectIndex');
storiesOf('Frontpage|screens/UseCasesScreen/ComponentCanvas', module)
  .addDecorator(storyFn => <div style={{ padding: '60px' }}>{storyFn()}</div>)
  .add('default', () => <ComponentCanvas selectedIndex={0} onSelectIndex={onSelectIndex} />);
