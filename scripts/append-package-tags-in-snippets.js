const fs = require('fs');
const path = require('path');
const versionData = require('../src/util/version-data');

const { isPreRelease } = versionData;

const FILE_FILTER = (file) =>
  file.includes('.npm') ||
  file.includes('.npx') ||
  file.includes('.pnpm') ||
  file.includes('.yarn');

const snippetFiles = fs
  .readdirSync(path.resolve(__dirname, '../src/content/docs/snippets/common'))
  .filter(FILE_FILTER);

const MATCH_LIST = (preRelease) => {
  const tag = preRelease ? '@next' : '@latest';

  return [
    // `storybook init` || `storybook upgrade` (but not `storybook upgrade --prerelease`)
    {
      test: /(storybook)(?:@.*)? (init|upgrade)(?! --prerelease)/,
      replacer: `$1${tag} $2`,
    },
    // `@storybook/...`
    {
      test: /(@storybook\/(?:\w+-?)+)(?:@.*)?/g,
      replacer: (_, pkg) => `${pkg}${tag}`,
    },
  ];
};

function appendPackageTagsInSnippets(fileContents, preRelease) {
  let updatedContents = fileContents;

  MATCH_LIST(preRelease).forEach(({ test, replacer }) => {
    if (fileContents.match(test)) {
      updatedContents = updatedContents.replace(test, replacer);
    }
  });

  return updatedContents;
}

snippetFiles.forEach((file) => {
  const filePath = path.resolve(__dirname, '../src/content/docs/snippets/common', file);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const updatedContents = appendPackageTagsInSnippets(fileContents, isPreRelease);
  fs.writeFileSync(filePath, updatedContents, 'utf8');
});

module.exports = { appendPackageTagsInSnippets };
