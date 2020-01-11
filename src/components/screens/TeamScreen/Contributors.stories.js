/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { PureContributors } from './Contributors';

const contributors = [...Array(30)].map((_, index) => ({
  id: index,
  avatar_url: 'https://avatars2.githubusercontent.com/u/263385',
}));

storiesOf('Frontpage|screens/TeamScreen/Contributors', module)
  .addParameters({ component: PureContributors })
  .add('default', () => <PureContributors contributors={contributors} contributorCount={100} />);
