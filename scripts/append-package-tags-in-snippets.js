const fs = require('fs');
const { readdir } = require('fs').promises;
const path = require('path');
const versionData = require('../src/util/version-data');

const { isPreRelease } = versionData;

const DOCS_DIR = path.resolve(__dirname, '../src/content/docs');

const PKG_DISALLOW_LIST = [
  '@storybook/addon-coverage',
  '@storybook/addon-webpack5-compiler-babel',
  '@storybook/addon-webpack5-compiler-swc',
];

const INLINE_CODE_REGEX = /`(?!`)(.*)`/g;
const CODE_BLOCK_REGEX = /```(?:sh|shell|bash)\n\s*(?:#.*\n)?(.*)\n\s*```/g;

const INLINE_CODE_MATCH_LIST = (preRelease) => [
  {
    test: /(storybook)(?:@\w+)? (add|automigrate|babelrc|extract|init|migrate|upgrade)(?! --prerelease)/g,
    replacer: `$1${preRelease ? '@next' : '@latest'} $2`,
  },
];

const CODE_BLOCK_MATCH_LIST = (preRelease) => [
  ...INLINE_CODE_MATCH_LIST(preRelease),
  {
    test: /(@storybook\/(?:\w+-?)+)(?:@\w+)?/g,
    replacer: (_, pkg) => `${pkg}${preRelease && !PKG_DISALLOW_LIST.includes(pkg) ? '@next' : ''}`,
  },
];

function updateSnippet(snippetSrc, isBlockCodeSnippet, preRelease) {
  const matchList = isBlockCodeSnippet ? CODE_BLOCK_MATCH_LIST : INLINE_CODE_MATCH_LIST;

  let updatedSnippetSrc = snippetSrc;

  matchList(preRelease).forEach(({ test, replacer }) => {
    if (snippetSrc.match(test)) {
      updatedSnippetSrc = updatedSnippetSrc.replace(test, replacer);
    }
  });

  return updatedSnippetSrc;
}

function updateFile(fileContents, preRelease) {
  let updatedContents = fileContents;

  const inlineCodeSnippets = (fileContents.match(INLINE_CODE_REGEX) || []).map((code) =>
    code.replace(INLINE_CODE_REGEX, '$1')
  );

  if (inlineCodeSnippets.length > 0) {
    inlineCodeSnippets.forEach((snippet) => {
      const updatedSnippet = updateSnippet(snippet, false, preRelease);
      updatedContents = updatedContents.replace(snippet, updatedSnippet);
    });
  }

  const blockCodeSnippets = (fileContents.match(CODE_BLOCK_REGEX) || []).map((code) =>
    code.replace(CODE_BLOCK_REGEX, '$1')
  );

  if (blockCodeSnippets.length > 0) {
    blockCodeSnippets.forEach((snippet) => {
      const updatedSnippet = updateSnippet(snippet, true, preRelease);
      updatedContents = updatedContents.replace(snippet, updatedSnippet);
    });
  }

  return updatedContents;
}

// https://stackoverflow.com/a/45130990
async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

(async () => {
  const docsFiles = (await getFiles(DOCS_DIR)).filter(
    (file) => file.endsWith('.md') || file.endsWith('.mdx')
  );

  docsFiles.forEach((file) => {
    const fileContents = fs.readFileSync(file, 'utf8');
    const updatedContents = updateFile(fileContents, isPreRelease);
    fs.writeFileSync(file, updatedContents, 'utf8');
  });
})();

module.exports = { updateFile, updateSnippet };
