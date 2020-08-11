import React from 'react';
import { storiesOf } from '@storybook/react';

import TeamItem from './TeamItem';

storiesOf('Frontpage|screens/TeamScreen/TeamItem', module).add('default', () => (
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
));
