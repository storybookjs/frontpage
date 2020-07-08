import React from 'react';
import { storiesOf } from '@storybook/react';

import ReleaseNotFound from './ReleaseNotFound';

storiesOf('Frontpage|screens/ReleasesScreen/ReleaseNotFound', module).add('default', () => (
  <ReleaseNotFound version="1.0" />
));
