const buildPathWithVersion = require('../build-path-with-version');

function removeMdExtension(url) {
  return url.replace(/(?:\.md)?(#.*)?$/, '$1');
}

function removeTrailingIndex(url) {
  return url.replace(/\/index(#.*)?$/, '/$1');
}

function removeIndexPrefix(url) {
  return url.replace(/\/\d+-/, '/');
}

// Matches `./some-path`; captures `some-path`
const relativeUrlRegex = /^\.\/(.*)$/;
// Matches `../parent/some-path`, `../../parent/some-path`; captures `parent/some-path`
const multiLevelRelativeUrlRegex = /^(?:\.\.\/)+(.*)$/;

/**
 * Convert relative links in docs to relative but from the /docs root
 * See corresponding test cases
 */
function relativeToRootLinks(href, path = '') {
  // console.log(href, path, tocItem);

  let url = href;

  const versionedUrl = url.match(/\/release-(\d+-\d+)\//);
  if (versionedUrl) {
    // rewrite ../../../release-#-#/docs/parent/some-path style urls to /docs/version/parent/some-path
    const overrideVersion = versionedUrl[1].split('-').join('.');
    url = buildPathWithVersion(url.replace(/.*\/docs\/(.*)/, '/docs/$1'), overrideVersion);
  }

  const urlParts = url.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  // When the path (with normalized version) only has 2 parts, we need to ensure we hit the [1] logic, below
  if (pathParts.filter((p) => !p.match(/\d+\.\d+/)).length < 3 && relativeUrlRegex.test(url)) {
    // ./some-path -> `../parent/some-path`
    const parentPart = pathParts.slice().pop();
    url = url.replace(relativeUrlRegex, `../${parentPart}/$1`);
  }

  if (relativeUrlRegex.test(url)) {
    // `./some-path` -> `/docs/<version?>/parent/some-path`
    pathParts.splice(-1, 1, url.replace(relativeUrlRegex, '$1'));
    url = `/${pathParts.join('/')}`;
  }

  if (multiLevelRelativeUrlRegex.test(url)) {
    if (urlParts.length === 2) {
      // `../some-path` -> `/docs/<version?>/parent/some-path`
      pathParts.splice(-1, 1, url.replace(multiLevelRelativeUrlRegex, '$1'));
      url = `/${pathParts.join('/')}`;
    }
    // `../parent/some-path` -> `/docs/<version?>/parent/some-path`
    // [1]
    url = buildPathWithVersion(url.replace(multiLevelRelativeUrlRegex, '/docs/$1'));
  }

  return removeIndexPrefix(removeTrailingIndex(removeMdExtension(url)));
}

module.exports = relativeToRootLinks;
