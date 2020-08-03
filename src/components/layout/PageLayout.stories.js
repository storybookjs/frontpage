import React from 'react';
import { storiesOf } from '@storybook/react';

import PageLayout from './PageLayout';

import { pageContext as docsPageContext, data as docsLayoutData } from './DocsLayout.stories';

storiesOf('Frontpage|layout/PageLayout', module)
  .add('default', () => <PageLayout>children</PageLayout>)
  .add('docs layout', () => (
    <PageLayout data={docsLayoutData} pageContext={{ ...docsPageContext, layout: 'docs' }}>
      children
    </PageLayout>
  ));
