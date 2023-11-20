const githubDocsBaseUrl = 'https://github.com/storybookjs/storybook/tree/next';

function prefixPath(path, prefix) {
  return path ? `${prefix}/${path}` : prefix;
}

module.exports = function addStateToToc(items, pathPrefix = '/docs') {
  return items.map((item) => {
    const isIndexPage = item.type === 'heading' && !item.redirectPath;

    const path = prefixPath(item.pathSegment, pathPrefix);

    return {
      ...item,
      ...(item.type.match(/link|heading/) && {
        path: item.redirectPath ? prefixPath(item.redirectPath, pathPrefix) : path,
        githubUrl: `${githubDocsBaseUrl}${path}${isIndexPage ? '/index' : ''}.md`,
      }),
      ...(item.children && { children: addStateToToc(item.children, path) }),
    };
  });
};
