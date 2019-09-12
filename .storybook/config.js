import React, { Fragment } from 'react';
import { configure, addDecorator } from '@storybook/react';
import 'storybook-chromatic';
import { isChromatic } from 'storybook-chromatic';
import WebFont from 'webfontloader';
import LazyLoad from '../src/components/basics/LazyLoad';

import { GlobalStyle } from '../src/components/basics/shared/global';
import config from '../gatsby-config';

WebFont.load(config.plugins.find(p => p.resolve === 'gatsby-plugin-web-font-loader').options);
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

const stories = [
  // automatically import all files ending in *.stories.js
  require.context('../src', true, /.stories.js$/),
]

if (!isChromatic()) {
  stories.push(require.context('../node_modules/@storybook/design-system', true, /.stories.js$/))
}

configure(stories, module);
