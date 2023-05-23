import React from 'react';

import SocialProof from './SocialProof';

export default {
  title: 'Layout/SocialProof',
  component: SocialProof,
};

export const Heading = () => (
  <SocialProof
    heading="Trusted by"
    path="images/logos/user"
    brands={['github', 'dropbox', 'airbnb', 'lyft', 'mozilla', 'microsoft', 'jetbrains']}
  />
);

export const Monochrome = () => (
  <SocialProof
    path="images/logos/user"
    brands={['github', 'dropbox', 'airbnb', 'lyft', 'mozilla', 'microsoft', 'jetbrains']}
    monochrome
  />
);

export const Grid = () => (
  <SocialProof
    path="images/logos/user"
    brands={[
      'github',
      'dropbox',
      'airbnb',
      'lyft',
      'mozilla',
      'microsoft',
      'monday',
      'auth0',
      'atlassian',
      'priceline',
      'artsy',
      'apollo',
      'jetbrains',
    ]}
    grid
  />
);
