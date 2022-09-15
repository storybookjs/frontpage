// import React from 'react';
// import { CacheProvider, createCache } from '@storybook/theming';

// const EMOTION_KEY = 'chr';

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

/**
 * What's happening here?
 * Emotion comes with zero-config SSR. However, if you're using nth child or
 * similar selectors then you need an advanced setup (https://emotion.sh/docs/ssr#advanced-approach)
 *
 * https://github.com/Andarist set this up for us here: https://github.com/storybookjs/frontpage/pull/321
 *
 * However, it's now causing issues with React Helmet. Many of our pages no
 * longer have meta tags in SSR. That breaks OG images and descriptions.
 *
 * We've removed most of those nth child selectors and therefore going back to
 * the zero-config emotion SSR setup.
 */

// const cache = createCache({ key: EMOTION_KEY });
// cache.compat = true;

// export const wrapRootElement = ({ element }) => (
//   <CacheProvider value={cache}>{element}</CacheProvider>
// );
