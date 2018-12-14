import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityItem from './CommunityItem';
import CommunityList from './CommunityList';

const Community = (
  <CommunityItem
    image={<img src="images/community/brand.svg" alt="brand" />}
    title="Use the brand"
    desc="Create your own visuals using Storybook logo, typography, colors, and images."
    links={[
      { title: 'View brand', href: 'https://google.com' },
      { title: 'View design system', href: 'https://google.com' },
    ]}
  />
);

storiesOf('screens/CommunityScreen/CommunityList', module).add('default', () => (
  <div style={{ maxWidth: '600px' }}>
    <CommunityList>
      {Community}
      {Community}
      {Community}
    </CommunityList>
  </div>
));
