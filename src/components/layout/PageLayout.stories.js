import React from 'react';

import { PurePageLayout } from './PageLayout';

import { pageContext as docsPageContext } from './DocsLayout.stories';

export default {
  title: 'Layout/PageLayout',
  component: PurePageLayout,
};

export const dxData = {
  subscriberCount: 5726,
  latestPost: {
    title: 'Why Storybook in 2022?',
    url: 'https://storybook.js.org/blog/why-storybook-in-2022',
  },
  npmDownloads: 16737033,
  githubStars: 73811,
  latestVersion: '6.5',
};

export const Base = () => (
  <PurePageLayout dxData={dxData} pageContext={{}} location={{ pathname: '/' }}>
    <div style={{ height: 600, border: '1px solid #ccc', color: '#fff' }}>children</div>
  </PurePageLayout>
);
Base.parameters = {
  backgrounds: { default: 'dark' },
};

export const DocsLayout = () => (
  <PurePageLayout
    dxData={dxData}
    pageContext={{ ...docsPageContext, layout: 'docs' }}
    location={{ pathname: '/docs/' }}
  >
    <div style={{ height: 600, border: '1px solid #ccc' }}>children</div>
  </PurePageLayout>
);

export const IframeLayout = () => (
  <PurePageLayout
    dxData={dxData}
    pageContext={{ layout: 'iframe' }}
    location={{ pathname: '/releases/' }}
  >
    <div style={{ height: 600, border: '1px solid #ccc' }}>children</div>
  </PurePageLayout>
);
