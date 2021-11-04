import React from 'react';

import PageLayout from './PageLayout';

import { pageContext as docsPageContext } from './DocsLayout.stories';

export default {
  title: 'Frontpage|layout/PageLayout',
  component: PageLayout,
};

export const Base = () => <PageLayout pageContext={{}}>children</PageLayout>;

export const DocsLayout = () => (
  <PageLayout pageContext={{ ...docsPageContext, layout: 'docs' }}>children</PageLayout>
);

export const IframeLayout = () => (
  <PageLayout pageContext={{ layout: 'iframe' }}>children</PageLayout>
);
