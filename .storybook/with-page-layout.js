import React from 'react';
import { PurePageLayout } from '../src/components/layout/PageLayout';
import { dxData } from '../src/components/layout/PageLayout.stories';

export function withPageLayout(story, { parameters }) {
  const { pageLayout } = parameters;

  return pageLayout ? (
    <PurePageLayout
      dxData={dxData}
      pageContext={{ layout: pageLayout.layout || '' }}
      location={{ pathname: pageLayout.pathname || '' }}
    >
      {story()}
    </PurePageLayout>
  ) : (
    story()
  );
}
