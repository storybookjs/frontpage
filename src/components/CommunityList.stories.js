import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityItem from './CommunityItem';
import CommunityList from './CommunityList';

const Community = (
  <CommunityItem
    image={<img src="community/brand.svg" />}
    title="Use the brand"
    desc="Create your own visuals using Storybook logo, typography, colors, and images."
    links={[
      { title: 'View brand', href: 'https://google.com' },
      { title: 'View design system', href: 'https://google.com' },
    ]}
  />
);

storiesOf('Screens/CommunityScreen/CommunityList', module).add('default', () => (
  <div style={{ maxWidth: '800px' }}>
    <CommunityList>
      {Community}
      {Community}
      {Community}
    </CommunityList>
  </div>
));
