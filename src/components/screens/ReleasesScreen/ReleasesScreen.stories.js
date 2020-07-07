import React from 'react';
import { storiesOf } from '@storybook/react';

import ReleasesScreen from './ReleasesScreen';

// eslint-disable-next-line import/prefer-default-export
export const buildRelease = version => ({
  html: `<div><h2>This is the release summary for version ${version}</h2><p>Here is a paragraph to describe things.</p></div>`,
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
