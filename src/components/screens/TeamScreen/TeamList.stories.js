import React from 'react';
import { storiesOf } from '@storybook/react';

import TeamItem from './TeamItem';
import ContributorItem from './ContributorItem';
import { contributors } from './ContributorItem.stories';
import TeamList from './TeamList';

const Item = (
  <TeamItem
    name="Tom Coleman"
    title="Cat herder"
    company="Storybook"
    companyUrl="https://storybook.js.org"
    location="Melbourne, Australia"
    avatarUrl="https://avatars0.githubusercontent.com/u/132554?s=400&v=4"
    gitHubUrl="https://github.com/tmeasday"
    twitterUrl="https://twitter.com/tmeasday"
  />
);

storiesOf('Frontpage|screens/TeamScreen/TeamList', module).add('full', () => (
  <TeamList>
    {Item}
    {Item}
    {Item}
    {Item}
    {Item}
    <ContributorItem
      contributors={contributors}
      contributorCount={550}
      gitHubUrl="https://github.com/storybooks/storybook"
    />
  </TeamList>
));
