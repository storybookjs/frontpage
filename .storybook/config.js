import { configure } from '@storybook/react';
import 'storybook-chromatic';

// add styled-components global styles here

// Needed to add these to get Gatsby's links working.
// We may need to do more: https://www.gatsbyjs.org/docs/unit-testing/
window.__PATH_PREFIX__ = '/';
window.___loader = {
  enqueue: () => null,
};
// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
