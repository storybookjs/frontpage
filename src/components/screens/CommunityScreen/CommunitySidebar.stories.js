import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from '@storybook/design-system';
import CommunitySidebar from './CommunitySidebar';

storiesOf('Frontpage|screens/CommunityScreen/CommunitySidebar', module)
  .addDecorator(storyFn => <div style={{ width: '400px' }}>{storyFn()}</div>)
  .add('children', () => (
    <CommunitySidebar
      title="Contribute code"
      desc="Storybook is maintained by contributors from around the globe. Join us in building the most popular component explorer."
    >
      <div>Have questions about contributing? Ask the community on chat.</div>
    </CommunitySidebar>
  ))
  .add('loneChild', () => (
    <CommunitySidebar
      title="Contribute code"
      desc="Storybook is maintained by contributors from around the globe. Join us in building the most popular component explorer."
      loneChild
    >
      <Button primary>Do something</Button>
    </CommunitySidebar>
  ));
