import React from 'react';
import { storiesOf } from '@storybook/react';

import SocialProof from './SocialProof';

storiesOf('Frontpage|layout/SocialProof', module)
  .add('heading', () => (
    <SocialProof
      heading="Trusted by"
      path="images/logos/user"
      brands={['github', 'dropbox', 'airbnb', 'lyft', 'mozilla', 'microsoft', 'jetbrains']}
    />
  ))
  .add('monochrome', () => (
    <SocialProof
      path="images/logos/user"
      brands={['github', 'dropbox', 'airbnb', 'lyft', 'mozilla', 'microsoft', 'jetbrains']}
      monochrome
    />
  ))
  .add('grid', () => (
    <SocialProof
      path="images/logos/user"
      brands={[
        'github',
        'dropbox',
        'airbnb',
        'lyft',
        'mozilla',
        'microsoft',
        'govuk',
        'auth0',
        'atlassian',
        'priceline',
        'artsy',
        'apollo',
        'jetbrains',
      ]}
      grid
    />
  ));
