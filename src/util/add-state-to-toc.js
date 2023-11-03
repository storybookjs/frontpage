const githubDocsBaseUrl = 'https://github.com/storybookjs/storybook/tree/next';

module.exports = function addStateToToc(items, pathPrefix = '/docs') {
  return items.map((item) => {
    const itemPath = item.pathSegment ? `${pathPrefix}/${item.pathSegment}` : pathPrefix;

    let filePath = itemPath;
    if (item.type === 'sub-page') {
      // Translate from route path (with /) to file path (with .)
      const subPagePath = itemPath.split('/').pop();
      filePath = filePath.replace(`/${subPagePath}`, `.${subPagePath}`);
    }

    return {
      ...item,
      ...(item.type.match(/link|sub-page/) && {
        path: itemPath,
        githubUrl: `${githubDocsBaseUrl}${filePath}.md`,
      }),
      ...(item.children && { children: addStateToToc(item.children, itemPath) }),
    };
  });
};
