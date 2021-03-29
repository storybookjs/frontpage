const { resolve, format } = require('url');
const rehype = require('rehype');
const rehypeUrls = require('rehype-urls');
const rehypeStringify = require('rehype-stringify');
const visit = require('unist-util-visit');

function absoluteLink(link, { base, assetBase, isAsset } = {}) {
  if (link.startsWith('#')) {
    return link;
  }
  return resolve(isAsset ? assetBase : base, link);
}

function absoluteLinksHtml(html, opts) {
  const buf = rehype()
    .use(rehypeUrls, (url, node) => {
      return absoluteLink(format(url), { ...opts, isAsset: node.properties.src });
    })
    .use(rehypeStringify, { closeSelfClosing: true })
    .processSync(html);

  return String(buf).replace('<html><head></head><body>', '').replace('</body></html>', '\n');
}

module.exports = function absoluteLinks(opts) {
  // eslint-disable-next-line
  opts.assetBase = assetUrl(opts.base);

  return transform;

  function transform(tree) {
    // https://github.com/syntax-tree/mdast#nodes
    visit(tree, ['link', 'image', 'html'], visitor);

    function visitor(node) {
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
        case 'image': {
          // eslint-disable-next-line
          node.url = absoluteLink(node.url, {
            ...opts,
            isAsset: true,
          });
          return;
        }
        default:
          throw new Error(`Unexpected: ${node.type}`);
      }
    }
  }
};

function assetUrl(repositoryUrl) {
  if (!repositoryUrl) return repositoryUrl;

  const repositoryRegex = /github\.com\/(.+\/.+)\//;
  const parseResult = repositoryUrl.match(repositoryRegex);

  if (parseResult && parseResult[1]) {
    const repository = parseResult[1];
    return `https://raw.githubusercontent.com/${repository}/HEAD/`;
  }

  return repositoryUrl;
}
