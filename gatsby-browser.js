import React from 'react';
import { CacheProvider, createCache } from '@storybook/theming';

const EMOTION_KEY = 'chr';

/* eslint-env browser */
export const onRouteUpdate = ({ location, prevLocation }) => {
  if (
    location.pathname.match(/iframe/) ||
    !window.analytics ||
    !process.env.GATSBY_SEGMENT_WRITE_KEY
  )
    return;

  // Segment removes the load function when it has been called already
  if (window.analytics.load) {
    window.analytics.load(process.env.GATSBY_SEGMENT_WRITE_KEY);
  }

  window.analytics.page();
};

const cache = createCache({ key: EMOTION_KEY });
cache.compat = true;

export const wrapRootElement = ({ element }) => (
  <CacheProvider value={cache}>{element}</CacheProvider>
);
