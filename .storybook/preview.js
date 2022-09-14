/* eslint-env browser */
/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import isChromatic from 'chromatic/isChromatic';
import { global as designSystemGlobal } from '@storybook/design-system';
import WebFont from 'webfontloader';
import { action } from '@storybook/addon-actions';
import { css, Global } from '@storybook/theming';

import LazyLoad from '../src/components/basics/LazyLoad';

const { GlobalStyle } = designSystemGlobal;
const noBodyPadding = css`
  body {
    padding: 0 !important;
  }
`;

WebFont.load({
  custom: {
    urls: [designSystemGlobal.fontUrl],
  },
});

export const decorators = [
  (story) => (
    <Fragment>
      <GlobalStyle />
      <Global styles={noBodyPadding} />
      {story()}
    </Fragment>
  ),
];

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#fff' },
      { name: 'dark', value: '#171C23' },
    ],
  },
  viewport: {
    viewports: {
      smallMobile: {
        name: 'Mobile (Small)',
        styles: {
          width: '320px',
          height: '100%',
        },
      },
      mobile: {
        name: 'Mobile',
        styles: {
          width: '440px',
          height: '100%',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '600px',
          height: '100%',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '900px',
          height: '100%',
        },
      },
      desktopXL: {
        name: 'DesktopXL',
        styles: {
          width: '1200px',
          height: '100%',
        },
      },
    },
  },
};

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__PATH_PREFIX__ = '';
global.__BASE_PATH__ = '/';
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

// Don't use lazyload for chromatic screenshots
if (isChromatic()) {
  LazyLoad.disabled = true;
}
