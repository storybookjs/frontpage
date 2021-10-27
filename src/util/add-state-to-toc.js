const githubDocsBaseUrl = 'https://github.com/storybookjs/storybook/tree/next';

module.exports = function addStateToToc(items, pathPrefix = '/docs') {
  return items.map((item) => {
    const itemPath = item.pathSegment ? `${pathPrefix}/${item.pathSegment}` : pathPrefix;

    return {
      ...item,
      ...(item.type.match(/link/) && {
        path: itemPath,
        githubUrl: `${githubDocsBaseUrl}${itemPath}.md`,
      }),
      ...(item.children && { children: addStateToToc(item.children, itemPath) }),
    };
  });
};
