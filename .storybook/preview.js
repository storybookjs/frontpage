/* eslint-env browser */
/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import isChromatic from 'chromatic/isChromatic';
import { global as designSystemGlobal } from '@storybook/design-system';
import WebFont from 'webfontloader';
import { action } from '@storybook/addon-actions';
import { createGlobalStyle } from 'styled-components';

import LazyLoad from '../src/components/basics/LazyLoad';

const { GlobalStyle } = designSystemGlobal;
const NoBodyPadding = createGlobalStyle`body { padding: 0 !important; }`;

WebFont.load({
  custom: {
    urls: [designSystemGlobal.fontUrl],
  },
});

export const decorators = [
  (story) => (
    <Fragment>
      <GlobalStyle />
      <NoBodyPadding />
      {story()}
    </Fragment>
  ),
];

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
global.__BASE_PATH__ = '';

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

// Don't use lazyload for chromatic screenshots
if (isChromatic()) {
  LazyLoad.disabled = true;
}
