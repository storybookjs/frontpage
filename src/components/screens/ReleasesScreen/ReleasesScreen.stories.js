import React from 'react';
import { storiesOf } from '@storybook/react';

import ReleasesScreen from './ReleasesScreen';

const buildRelease = version => ({
  html: `<h2>This is the release summary for version ${version}</h2>`,
  fields: {
    slug: `/${version}`,
    version,
  },
  frontmatter: {
    title: `Version ${version}`,
  },
});

const currentPage = buildRelease('2.0');

const data = {
  allReleases: {
    edges: [
      {
        node: currentPage,
      },
      {
        node: buildRelease('1.0'),
      },
    ],
  },
  currentPage,
};

storiesOf('Frontpage|screens/ReleasesScreen/ReleasesScreen', module).add(
  'default',
  () => <ReleasesScreen data={data} />,
  {
    chromatic: { viewports: [320, 1200] },
  }
);
