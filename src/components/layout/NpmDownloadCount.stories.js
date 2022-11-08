import React from 'react';
import { NpmDownloadCount as NpmDownloadCountComponent } from './NpmDownloadCount';

export default {
  title: 'Layout/NpmDownloadCount',
  component: NpmDownloadCountComponent,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

export const NpmDownloadCount = () => (
  <NpmDownloadCountComponent downloads={16737033} className="chromatic-ignore" />
);
NpmDownloadCount.parameters = {
  backgrounds: { default: 'dark' },
};
NpmDownloadCount.storyName = 'NpmDownloadCount';
