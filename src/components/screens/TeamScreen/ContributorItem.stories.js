import React from 'react';
import { storiesOf } from '@storybook/react';

import ContributorItem from './ContributorItem';

export const contributors = [
  {
    name: 'Dominic Nguyen',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/263385',
  },
  {
    name: 'Tom Coleman',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
  },
  {
    name: 'Norbert de Langen',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/3070389',
  },
  {
    name: 'Igor Davydkin',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/7867954',
  },
  {
    name: 'Filipp Riachbun',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/6651625',
  },
  {
    name: 'Michael Shilman',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/488689',
  },
  {
    name: 'Carlos Vega',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/1593752',
  },
  {
    name: 'Gytis Vinclovas',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/3867635',
  },
  {
    name: 'Chak Shun Yu',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/5955441',
  },
];

storiesOf('Frontpage|screens/TeamScreen/ContributorItem', module).add('default', () => (
  <ContributorItem
    contributors={contributors}
    contributorCount={550}
    gitHubUrl="https://github.com/storybooks/storybook"
  />
));
