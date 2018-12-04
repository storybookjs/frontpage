import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityItem from './CommunityItem';

storiesOf('Screens/CommunityScreen/CommunityItem', module)
  .add('link', () => (
    <CommunityItem
      image={<img src="community/brand.svg" />}
      title="Use the brand"
      desc="Create your own visuals using Storybook logo, typography, colors, and images."
      links={[{ title: 'View brand', href: 'https://google.com' }]}
    />
  ))
  .add('links', () => (
    <CommunityItem
      image={<img src="community/brand.svg" />}
      title="Use the brand"
      desc="Create your own visuals using Storybook logo, typography, colors, and images."
      links={[
        { title: 'View brand', href: 'https://google.com' },
        { title: 'View design system', href: 'https://google.com' },
      ]}
    />
  ));
