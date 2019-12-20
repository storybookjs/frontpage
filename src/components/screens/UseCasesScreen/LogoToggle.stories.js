import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LogoToggle from './LogoToggle';

const onSelectIndex = action('onSelectIndex');
storiesOf('Frontpage|screens/UseCasesScreen/LogoToggle', module)
  .addDecorator(storyFn => <div style={{ padding: '60px' }}>{storyFn()}</div>)
  .add('default', () => (
    <LogoToggle
      path="images/logos/user"
      brands={['airbnb', 'atlassian', 'algolia']}
      selectedIndex={0}
      onSelectIndex={onSelectIndex}
    />
  ))
  .add('readOnly', () => (
    <LogoToggle path="images/logos/user" brands={['airbnb', 'atlassian', 'algolia']} readOnly />
  ));
