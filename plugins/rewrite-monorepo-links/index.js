const { createFilePath } = require(`gatsby-source-filesystem`);
const visit = require('unist-util-visit');

const monorepoURL = 'https://github.com/storybookjs/storybook/tree/master';

module.exports = function plugin({ markdownAST, markdownNode, getNode }) {
  // e.g. docs/api/csf
  const fileSlug = createFilePath({
    node: markdownNode,
    getNode,
    basePath: 'content',
    trailingSlash: false,
  });
  // e.g. 2
  const fileDepth = fileSlug.split('/').length - 1;

  function visitor(node) {
    if (node.url.startsWith('..')) {
      // e.g. '../../lib/core/ADVANCED.md
      const parts = node.url.split('/');
      // e.g. 2
      const relativeDepth = parts.map((p) => p === '..').indexOf('..');

      if (relativeDepth === fileDepth) {
        // eslint-disable-next-line no-param-reassign
        node.url = `${monorepoURL}/${parts.slice(relativeDepth).join('/')}`;
      } else if (relativeDepth > fileDepth) {
        console.log(`Unexpected relative link: ${node.url} from ${fileSlug}`);
      }
    }
  }

  visit(markdownAST, 'link', visitor);

  return markdownAST;
};
