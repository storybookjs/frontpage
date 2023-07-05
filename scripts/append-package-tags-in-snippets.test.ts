const { appendPackageTagsInSnippets } = require('./append-package-tags-in-snippets');

function makeFileContents(str) {
  return `
\`\`\`shell
${str}
\`\`\`
`;
}

describe('appendPackageTagsInSnippets', () => {
  it('matches desired patterns', () => {
    expect(appendPackageTagsInSnippets(makeFileContents('npx storybook init')))
      .toMatchInlineSnapshot(`
      "
      \`\`\`shell
      npx storybook@latest init
      \`\`\`
      "
    `);
    expect(appendPackageTagsInSnippets(makeFileContents('npx storybook upgrade')))
      .toMatchInlineSnapshot(`
      "
      \`\`\`shell
      npx storybook@latest upgrade
      \`\`\`
      "
    `);
    expect(appendPackageTagsInSnippets(makeFileContents('yarn add -D @storybook/testing-library')))
      .toMatchInlineSnapshot(`
      "
      \`\`\`shell
      yarn add -D @storybook/testing-library@latest
      \`\`\`
      "
    `);
  });
  it('handles multiple matches', () => {
    expect(
      appendPackageTagsInSnippets(
        makeFileContents(
          'yarn add -D @storybook/testing-library @storybook/jest @storybook/addon-interactions'
        )
      )
    ).toMatchInlineSnapshot(`
      "
      \`\`\`shell
      yarn add -D @storybook/testing-library@latest @storybook/jest@latest @storybook/addon-interactions@latest
      \`\`\`
      "
    `);
  });
  it('does not match `npm run storybook` or `yarn storybook`', () => {
    expect(appendPackageTagsInSnippets(makeFileContents('npm run storybook')))
      .toMatchInlineSnapshot(`
      "
      \`\`\`shell
      npm run storybook
      \`\`\`
      "
    `);
    expect(appendPackageTagsInSnippets(makeFileContents('yarn storybook'))).toMatchInlineSnapshot(`
      "
      \`\`\`shell
      yarn storybook
      \`\`\`
      "
    `);
  });
  it('does nothing for `storybook upgrade --prerelease`', () => {
    expect(appendPackageTagsInSnippets(makeFileContents('npx storybook@next upgrade --prerelease')))
      .toMatchInlineSnapshot(`
      "
      \`\`\`shell
      npx storybook@next upgrade --prerelease
      \`\`\`
      "
    `);
  });
  it('appends the correct tag', () => {
    expect(appendPackageTagsInSnippets(makeFileContents('npx storybook init'), true))
      .toMatchInlineSnapshot(`
      "
      \`\`\`shell
      npx storybook@next init
      \`\`\`
      "
    `);
  });
  it('Removes existing tags', () => {
    expect(appendPackageTagsInSnippets(makeFileContents('npx storybook@latest init'), true))
      .toMatchInlineSnapshot(`
      "
      \`\`\`shell
      npx storybook@next init
      \`\`\`
      "
    `);
    expect(appendPackageTagsInSnippets(makeFileContents('npx storybook@next init')))
      .toMatchInlineSnapshot(`
      "
      \`\`\`shell
      npx storybook@latest init
      \`\`\`
      "
    `);
    expect(
      appendPackageTagsInSnippets(
        makeFileContents('yarn add -D @storybook/testing-library@latest'),
        true
      )
    ).toMatchInlineSnapshot(`
      "
      \`\`\`shell
      yarn add -D @storybook/testing-library@next
      \`\`\`
      "
    `);
    expect(
      appendPackageTagsInSnippets(makeFileContents('yarn add -D @storybook/testing-library@next'))
    ).toMatchInlineSnapshot(`
      "
      \`\`\`shell
      yarn add -D @storybook/testing-library@latest
      \`\`\`
      "
    `);
  });
});
