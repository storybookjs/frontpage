import React from 'react';
import { storiesOf } from '@storybook/react';

import Footer from './Footer';

// eslint-disable-next-line import/prefer-default-export
export const allMediumPost = {
  edges: [
    {
      node: {
        id: 'bb9ae747-0318-54c1-8a5c-72b07798207a',
        title: 'Storybook Governance',
        virtuals: {
          subtitle: 'Supporting open open source',
        },
        uniqueSlug: 'storybook-governance-4d9e5bb39019',
      },
    },
    {
      node: {
        id: 'ff58e306-41d6-5fb1-9d51-92a166ac3c15',
        title: 'Storybook 4.1: Need for Speed',
        virtuals: {
          subtitle: 'Up to 300% faster, compatibility, convenience',
        },
        uniqueSlug: 'storybook-4-1-need-for-speed-b05fd5f1e83d',
      },
    },
    {
      node: {
        id: 'e8001e9d-7427-548e-8fc6-8fb3a4c4b225',
        title: 'Storybook 4 Migration Guide',
        virtuals: {
          subtitle: 'Three steps to next-generation UI development',
        },
        uniqueSlug: 'migrating-to-storybook-4-c65b19a03d2c',
      },
    },
  ],
};

storiesOf('layout/Footer', module).add('default', () => <Footer mediumPosts={allMediumPost} />);
