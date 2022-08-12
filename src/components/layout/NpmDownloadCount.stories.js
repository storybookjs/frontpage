import React from 'react';
import { NpmDownloadCount } from './NpmDownloadCount';

export default {
  title: 'Frontpage|layout/NpmDownloadCount',
  component: NpmDownloadCount,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

export const Default = () => <NpmDownloadCount className="chromatic-ignore" />;
Default.parameters = {
  backgrounds: { default: 'dark' },
};
