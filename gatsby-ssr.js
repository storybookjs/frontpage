/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@storybook/theming';
import createCache from '@emotion/cache';
import createEmotionServer from 'create-emotion-server';

const EMOTION_KEY = 'chr';

export const replaceRenderer = ({ setHeadComponents, replaceBodyHTMLString, bodyComponent }) => {
  const cache = createCache({ key: EMOTION_KEY });
  cache.compat = true;

  const { extractCritical } = createEmotionServer(cache);
  const { ids, css, html } = extractCritical(
    renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
  );

  setHeadComponents([
    <style
      {...{
        [`data-emotion-${EMOTION_KEY}`]: ids.join(' '),
        dangerouslySetInnerHTML: { __html: css },
      }}
    />,
  ]);

  replaceBodyHTMLString(html);
};
