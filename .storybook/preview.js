import React, { Fragment } from 'react';
import { addDecorator } from '@storybook/react';
import { global as designSystemGlobal } from '@storybook/design-system';
import WebFont from 'webfontloader';
import LazyLoad from '../src/components/basics/LazyLoad';

const { GlobalStyle } = designSystemGlobal;

WebFont.load({
  custom: {
    urls: [designSystemGlobal.fontUrl],
  },
});
addDecorator(story => (
  <Fragment>
    <GlobalStyle />
    {story()}
  </Fragment>
));

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};

// Don't use lazyload for chromatic screenshots
if (window.navigator.userAgent.match('Chromatic')) {
  LazyLoad.disabled = true;
}
