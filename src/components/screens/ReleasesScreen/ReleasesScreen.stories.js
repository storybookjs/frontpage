import React from 'react';
import { storiesOf } from '@storybook/react';

import ReleasesScreen from './ReleasesScreen';

// eslint-disable-next-line import/prefer-default-export
export const buildRelease = version => ({
  html: `
    <div>
      <h2>This is the release summary for version ${version}</h2>
      <h3>Here is a level 3 heading</h3>
      <h4>Here is a level 4 heading</h4>
      <p>Here is a paragraph to describe things.</p>
      <pre class="language-js"><code class=" language-js"><span class="token keyword">const</span> thing <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'thing'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
    </div>
  `,
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
