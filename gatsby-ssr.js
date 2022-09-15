// /**
//  * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/ssr-apis/
//  */

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

// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { CacheProvider, createCache } from '@storybook/theming';
// import createEmotionServer from '@emotion/server/create-instance';

// const EMOTION_KEY = 'chr';

// export const replaceRenderer = ({ setHeadComponents, replaceBodyHTMLString, bodyComponent }) => {
//   const cache = createCache({ key: EMOTION_KEY });
//   cache.compat = true;

//   const { extractCriticalToChunks } = createEmotionServer(cache);
//   const { html, styles } = extractCriticalToChunks(
//     renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
//   );

//   setHeadComponents(
//     styles.map(({ key, ids, css }) => (
//       <style
//         data-emotion={`${key} ${ids.join(' ')}`}
//         // eslint-disable-next-line react/no-danger
//         dangerouslySetInnerHTML={{ __html: css }}
//       />
//     ))
//   );

//   replaceBodyHTMLString(html);
// };
