import React from 'react';
import { storiesOf } from '@storybook/react';

import Hero from './Hero';

// eslint-disable-next-line import/prefer-default-export
export const gitHubRepoData = {
  contributorCount: 100,
  url: 'https://google.com',
  author: 'storybooks',
  name: 'storybook',
};

storiesOf('Frontpage|screens/IndexScreen/Hero', module).add('default', () => (
  <div style={{ padding: '3rem 0' }}>
    <Hero gitHubRepoData={gitHubRepoData} />
  </div>
));
