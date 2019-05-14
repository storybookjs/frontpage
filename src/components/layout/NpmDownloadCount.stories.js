import React from 'react';
import { storiesOf } from '@storybook/react';

import NpmDownloadCount from './NpmDownloadCount';

storiesOf('Frontpage|layout/NpmDownloadCount', module).add('default', () => (
  <NpmDownloadCount className="chromatic-ignore" />
));
