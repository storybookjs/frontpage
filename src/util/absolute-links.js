const { resolve, format } = require('url');
const rehype = require('rehype');
const rehypeUrls = require('rehype-urls');
const rehypeStringify = require('rehype-stringify');
const visit = require('unist-util-visit');

function absoluteLink(link, { base } = {}) {
  if (link.startsWith('#')) {
    return link;
  }
  return resolve(base, link);
}

function absoluteLinksHtml(html, opts) {
  const buf = rehype()
    .use(rehypeUrls, (url) => {
      return absoluteLink(format(url), opts);
    })
    .use(rehypeStringify, { closeSelfClosing: true })
    .processSync(html);

  return String(buf).replace('<html><head></head><body>', '').replace('</body></html>', '\n');
}

module.exports = function absoluteLinks(opts) {
  return transform;

  function transform(tree) {
    visit(tree, ['link', 'html'], visitor);

    function visitor(node) {
      // console.log('visit', node);

      if (!node) return;

      switch (node.type) {
        case 'link': {
          // eslint-disable-next-line
          node.url = absoluteLink(node.url, opts);
          return;
        }
        case 'html': {
          // eslint-disable-next-line
          node.value = absoluteLinksHtml(node.value, opts);
          return;
        }
        default:
          throw new Error(`Unexpected: ${node.type}`);
      }
    }
  }
};
