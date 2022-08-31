import React from 'react';

import PageLayout from './PageLayout';

import { pageContext as docsPageContext } from './DocsLayout.stories';

export default {
  title: 'Frontpage|layout/PageLayout',
  component: PageLayout,
};

export const Base = () => (
  <PageLayout pageContext={{}} location={{ pathname: '/' }}>
    <div style={{ height: 600, border: '1px solid #ccc', color: '#fff' }}>children</div>
  </PageLayout>
);
Base.parameters = {
  backgrounds: { default: 'dark' },
};

export const DocsLayout = () => (
  <PageLayout
    pageContext={{ ...docsPageContext, layout: 'docs' }}
    location={{ pathname: '/docs/' }}
  >
    <div style={{ height: 600, border: '1px solid #ccc' }}>children</div>
  </PageLayout>
);

export const IframeLayout = () => (
  <PageLayout pageContext={{ layout: 'iframe' }} location={{ pathname: '/releases/' }}>
    <div style={{ height: 600, border: '1px solid #ccc' }}>children</div>
  </PageLayout>
);
