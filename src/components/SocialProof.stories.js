/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import SocialProof from './SocialProof';

storiesOf('Layout/SocialProof', module)
  .add('default', () => (
    <SocialProof
      path="/logos/user"
      brands={['github', 'dropbox', 'airbnb', 'lyft', 'mozilla', 'salesforce']}
    />
  ))
  .add('monochrome', () => (
    <SocialProof
      path="/logos/user"
      brands={['github', 'dropbox', 'airbnb', 'lyft', 'mozilla', 'salesforce']}
      monochrome
    />
  ))
  .add('grid', () => (
    <SocialProof
      path="/logos/user"
      brands={[
        'github',
        'dropbox',
        'airbnb',
        'lyft',
        'mozilla',
        'salesforce',
        'github',
        'dropbox',
        'airbnb',
        'lyft',
        'mozilla',
        'salesforce',
      ]}
      grid
    />
  ));
