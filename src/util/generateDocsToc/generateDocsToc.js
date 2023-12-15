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
 * This is a factory function only for dependency injection.
 *
 * We need to sort both files (with a `navOrder` in their metadata) and directories (with a
 * `navOrder` in their `index.md`'s metadata).
 */
function makeSortFilesAndDirectories(generateDocsToc, pathToFiles, docsRoot) {
  return function sortFilesAndDirectories(a, b) {
    const aFilePath = path.join(pathToFiles, a);
    const bFilePath = path.join(pathToFiles, b);

    const aIsDirectory = fs.lstatSync(aFilePath).isDirectory();
    const bIsDirectory = fs.lstatSync(bFilePath).isDirectory();

    let aOrder = 0;
    let bOrder = 0;

    if (aIsDirectory) {
      const childItems = generateDocsToc(aFilePath, docsRoot);
      const indexItem = childItems.find((child) => child.pathSegment === 'index');
      if (indexItem) {
        aOrder = indexItem.navOrder;
      }
    } else {
      const metaData = getMetadata(aFilePath);
      aOrder = metaData.navOrder;
    }

    if (bIsDirectory) {
      const childItems = generateDocsToc(bFilePath, docsRoot);
      const indexItem = childItems.find((child) => child.pathSegment === 'index');
      if (indexItem) {
        bOrder = indexItem.navOrder;
      }
    } else {
      const metaData = getMetadata(bFilePath);
      bOrder = metaData.navOrder;
    }

    return aOrder - bOrder;
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
    .sort(makeSortFilesAndDirectories(generateDocsToc, pathToFiles, docsRoot))
    .forEach((file) => {
      const filePath = path.join(pathToFiles, file);
      const isDirectory = fs.lstatSync(filePath).isDirectory();

      if (isDirectory) {
        const dirPathSegment = file.replace(/^\d+-/, '');
        const childItems = generateDocsToc(filePath, docsRoot);

        if (childItems) {
          let title;
          let redirectPath;

          /**
           * We have to do the sub-page processing before the child items processing, because we
           * need the index child that is removed in the child items processing.
           */
          const subPageItems = childItems.filter((child) => {
            return child.type === 'sub-page';
          });
          const hasSubPages = subPageItems.length > 0;

          let subPages;
          let subPagePathSegments;
          if (hasSubPages) {
            subPagePathSegments = [
              // Include implicit index sub-page
              'index',
              ...subPageItems.map((subPage) => subPage.pathSegment),
            ];
            subPages = subPageItems.map(
              ({ activeSubPage, pathSegment, subPages: nestedSubPages, type }) => ({
                activeSubPage,
                pathSegment,
                subPagePathSegments,
                ...(nestedSubPages
                  ? {
                      subPages: nestedSubPages
                        // We don't want the index sub-page to be a sub-page of itself
                        .filter((nestedSubPage) => nestedSubPage.pathSegment !== 'index')
                        // We want the `activeSubPage` and `subPagePathSegments` of the _parent_ sub-page, so we overwrite them here
                        .map((nestedSubPage) => ({
                          ...nestedSubPage,
                          activeSubPage,
                          subPagePathSegments,
                        })),
                      activeSubPage,
                    }
                  : {}),
                type,
              })
            );
          }

          const indexItemIndex = childItems.findIndex((child) => child.pathSegment === 'index');

          const hasNestedSubPages =
            indexItemIndex !== -1 && childItems[indexItemIndex].type === 'sub-page';

          if (indexItemIndex !== -1) {
            const metaData = getMetadata(path.join(filePath, childItems[indexItemIndex].file));
            title = metaData.title;

            if (metaData.redirectTo) {
              redirectPath = path.join(dirPathSegment, metaData.redirectTo);
            }

            // Remove the index item, as it is represented by the parent item
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

          // Push the non-page item, with all of its processed children/sub-pages
          toc.push({
            pathSegment: dirPathSegment,
            ...(redirectPath ? { redirectPath } : {}),
            ...(title ? { title } : {}),
            ...(hasSubPages
              ? {
                  subPages,
                  subPagePathSegments,
                  ...(hasNestedSubPages
                    ? { type: 'sub-page', activeSubPage: dirPathSegment }
                    : { type: 'link', activeSubPage: 'index' }),
                }
              : { type: 'heading', children }),
          });
        }
      } else if (file.endsWith('.md')) {
        const { isSubPage, ...metaData } = getMetadata(filePath);
        const filePathSegment = file.replace(/^(?:\d+-)?(.*)\.md$/, '$1');

        // Push the page item
        toc.push({
          file,
          pathSegment: filePathSegment,
          ...(isSubPage ? { type: 'sub-page', activeSubPage: filePathSegment } : { type: 'link' }),
          ...metaData,
        });
      }
    });

  return toc;
};
