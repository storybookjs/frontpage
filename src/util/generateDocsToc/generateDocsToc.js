const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const NON_CONTENT_DIRECTORIES = ['assets', 'snippets', 'versions'];

function getMetadata(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const {
    data: { navTitle, title, ...data },
  } = matter(fileContents);
  return {
    title: navTitle || title,
    ...data,
  };
}

/**
 * @param pathToDocs string - Path to docs directory, relative to project root
 *
 * @param docsRoot string - Private; Path to docs root, relative to project root (used for recursion)
 *
 * @returns TOC array
 */
module.exports = function generateDocsToc(
  pathToFiles = 'src/content/docs',
  docsRoot = pathToFiles
) {
  const files = fs.readdirSync(pathToFiles);

  if (files.includes('toc.js')) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const { toc } = require(path.join('../../../', pathToFiles, 'toc.js'));
    return toc;
  }

  const toc = [];
  files
    .filter((file) => !NON_CONTENT_DIRECTORIES.includes(file))
    .forEach((file) => {
      const filePath = path.join(pathToFiles, file);
      const isDirectory = fs.lstatSync(filePath).isDirectory();

      if (isDirectory) {
        const childItems = generateDocsToc(filePath, docsRoot);

        if (childItems) {
          let title;
          let redirectPath;

          const indexItemIndex = childItems.findIndex((child) => child.pathSegment === 'index');
          if (indexItemIndex !== -1) {
            const metaData = getMetadata(
              path.join(pathToFiles, file, childItems[indexItemIndex].file)
            );
            title = metaData.title;

            if (metaData.redirectTo) {
              redirectPath = path.join(file.replace(/^\d+-/, ''), metaData.redirectTo);
            }

            childItems.splice(indexItemIndex, 1);
          }

          const children = childItems
            /**
             * Items always have a `navOrder` and, when in a group, a `navGroup.order`.
             * This sorts by `navGroup.order` (falling back to `navOrder`) first, then `navOrder`.
             */
            .sort(
              (a, b) =>
                (a.navGroup?.order || a.navOrder) - (b.navGroup?.order || b.navOrder) ||
                a.navOrder - b.navOrder
            )
            .reduce(
              (
                acc,
                {
                  navGroup,
                  // Remove these from the child items, as they're not needed beyond this point
                  file: ignoreFile,
                  navOrder: ignoreNavOrder,
                  ...child
                }
              ) => {
                if (navGroup) {
                  const group = acc.find((c) => c.title === navGroup.title);
                  if (group) {
                    group.children.push(child);
                  } else {
                    acc.push({
                      pathSegment: '',
                      title: navGroup.title,
                      type: 'menu',
                      children: [child],
                    });
                  }
                } else {
                  acc.push(child);
                }
                return acc;
              },
              []
            );

          toc.push({
            pathSegment: file.replace(/^\d+-/, ''),
            ...(redirectPath ? { redirectPath } : {}),
            ...(title ? { title } : {}),
            type: 'heading',
            children,
          });
        }
      } else if (file.endsWith('.md')) {
        const metaData = getMetadata(filePath);
        toc.push({
          file,
          pathSegment: file.replace(/^(?:\d+-)?(.*)\.md$/, '$1'),
          type: 'link',
          ...metaData,
        });
      }
    });

  return toc;
};
