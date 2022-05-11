/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { CacheProvider, createCache } from '@storybook/theming';
import createEmotionServer from '@emotion/server/create-instance';

const EMOTION_KEY = 'chr';

export const replaceRenderer = ({ setHeadComponents, replaceBodyHTMLString, bodyComponent }) => {
  const cache = createCache({ key: EMOTION_KEY });
  cache.compat = true;

  const { extractCriticalToChunks } = createEmotionServer(cache);
  const { html, styles } = extractCriticalToChunks(
    renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
  );

  setHeadComponents(
    styles.map(({ key, ids, css }) => (
      <style
        data-emotion={`${key} ${ids.join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css }}
      />
    ))
  );

  replaceBodyHTMLString(html);
};
