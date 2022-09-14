import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityHero from './CommunityHero';

export default {
  title: 'Frontpage|screens/CommunityScreen/CommunityHero',
  component: CommunityHero,
};

export const Default = () => <CommunityHero npmDownloads={16094826} githubStarCount={73809} />;
