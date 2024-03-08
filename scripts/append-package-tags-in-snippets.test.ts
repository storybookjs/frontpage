const { updateFile, updateSnippet } = require('./append-package-tags-in-snippets');

describe('updateFile', () => {
  it('matches block shell snippets and appropriate inline snippets', () => {
    expect(
      updateFile(
        `
<!-- Block shell command snippet; should update -->
\`\`\`sh
npx storybook init
\`\`\`

<!-- Block shell command snippet; should update -->
\`\`\`shell
npx storybook init
\`\`\`

<!-- Block shell command snippet; should update -->
\`\`\`bash
npx storybook init
\`\`\`

<!-- Block shell install snippet; should update -->
\`\`\`sh
yarn add -D @storybook/testing-library
\`\`\`

  <!-- Indented block shell command snippet; should update -->
  \`\`\`sh
  npx storybook init
  \`\`\`

<!-- Block shell command snippet with comment; should update -->
\`\`\`sh
# With comment
npx storybook init
\`\`\`

<!-- Inline command snippet; should update -->
\`npx storybook init\`

<!-- Block non-shell snippet; should remain -->
\`\`\`tsx
npx storybook init
\`\`\`

<!-- Inline install snippet; should remain -->
\`@storybook/testing-library\`
    `,
        true
      )
    ).toMatchInlineSnapshot(`
      "
      <!-- Block shell command snippet; should update -->
      \`\`\`sh
      npx storybook@next init
      \`\`\`

      <!-- Block shell command snippet; should update -->
      \`\`\`shell
      npx storybook@next init
      \`\`\`

      <!-- Block shell command snippet; should update -->
      \`\`\`bash
      npx storybook@next init
      \`\`\`

      <!-- Block shell install snippet; should update -->
      \`\`\`sh
      yarn add -D @storybook/testing-library@next
      \`\`\`

        <!-- Indented block shell command snippet; should update -->
        \`\`\`sh
        npx storybook@next init
        \`\`\`

      <!-- Block shell command snippet with comment; should update -->
      \`\`\`sh
      # With comment
      npx storybook@next init
      \`\`\`

      <!-- Inline command snippet; should update -->
      \`npx storybook@next init\`

      <!-- Block non-shell snippet; should remain -->
      \`\`\`tsx
      npx storybook init
      \`\`\`

      <!-- Inline install snippet; should remain -->
      \`@storybook/testing-library\`
          "
    `);
  });
});

describe('updateSnippet', () => {
  it('updates desired inline snippets', () => {
    expect(updateSnippet('npx storybook automigrate')).toMatchInlineSnapshot(
      `"npx storybook@latest automigrate"`
    );
    expect(updateSnippet('npx storybook babelrc')).toMatchInlineSnapshot(
      `"npx storybook@latest babelrc"`
    );
    expect(updateSnippet('npx storybook extract')).toMatchInlineSnapshot(
      `"npx storybook@latest extract"`
    );
    expect(updateSnippet('npx storybook init')).toMatchInlineSnapshot(
      `"npx storybook@latest init"`
    );
    expect(updateSnippet('npx storybook migrate')).toMatchInlineSnapshot(
      `"npx storybook@latest migrate"`
    );
    expect(updateSnippet('npx storybook upgrade')).toMatchInlineSnapshot(
      `"npx storybook@latest upgrade"`
    );
    expect(updateSnippet('npx storybook add @storybook/addon-pkg')).toMatchInlineSnapshot(
      `"npx storybook@latest add @storybook/addon-pkg"`
    );
  });
  it('does not update undesired inline snippets', () => {
    // Must use preRelease here to test non-effect (non-preRelease should not append tag)
    expect(updateSnippet('@storybook/testing-library', false, true)).toMatchInlineSnapshot(
      `"@storybook/testing-library"`
    );
  });
  it('updates desired block snippets', () => {
    expect(updateSnippet('npx storybook automigrate', true)).toMatchInlineSnapshot(
      `"npx storybook@latest automigrate"`
    );
    expect(updateSnippet('npx storybook babelrc', true)).toMatchInlineSnapshot(
      `"npx storybook@latest babelrc"`
    );
    expect(updateSnippet('npx storybook extract', true)).toMatchInlineSnapshot(
      `"npx storybook@latest extract"`
    );
    expect(updateSnippet('npx storybook init', true)).toMatchInlineSnapshot(
      `"npx storybook@latest init"`
    );
    expect(updateSnippet('npx storybook migrate', true)).toMatchInlineSnapshot(
      `"npx storybook@latest migrate"`
    );
    expect(updateSnippet('npx storybook remove', true)).toMatchInlineSnapshot(
      `"npx storybook@latest remove"`
    );
    expect(updateSnippet('npx storybook upgrade', true)).toMatchInlineSnapshot(
      `"npx storybook@latest upgrade"`
    );
    expect(updateSnippet('npx storybook add @storybook/addon-pkg', true)).toMatchInlineSnapshot(
      `"npx storybook@latest add @storybook/addon-pkg"`
    );
    // Must use preRelease here to test effect (non-preRelease should not append tag)
    expect(
      updateSnippet('yarn add -D @storybook/testing-library', true, true)
    ).toMatchInlineSnapshot(`"yarn add -D @storybook/testing-library@next"`);
  });
  it('does not update disallowed packages in block snippets', () => {
    // Must use preRelease here to test non-effect (preRelease should not append tag)
    expect(
      updateSnippet('npx storybook add @storybook/addon-coverage', true, true)
    ).toMatchInlineSnapshot(`"npx storybook@next add @storybook/addon-coverage"`);
    expect(
      updateSnippet('npx storybook add @storybook/addon-webpack5-compiler-babel', true, true)
    ).toMatchInlineSnapshot(`"npx storybook@next add @storybook/addon-webpack5-compiler-babel"`);
    expect(
      updateSnippet('npx storybook add @storybook/addon-webpack5-compiler-swc', true, true)
    ).toMatchInlineSnapshot(`"npx storybook@next add @storybook/addon-webpack5-compiler-swc"`);
  });
  it('handles multiple matches', () => {
    // Must use preRelease here to test effect (non-preRelease should not append tag)
    expect(
      updateSnippet(
        'yarn add -D @storybook/testing-library @storybook/jest @storybook/addon-interactions',
        true,
        true
      )
    ).toMatchInlineSnapshot(
      `"yarn add -D @storybook/testing-library@next @storybook/jest@next @storybook/addon-interactions@next"`
    );
    // Must use preRelease here to test effect (non-preRelease should not append tag)
    expect(
      updateSnippet(
        'yarn remove -D @storybook/testing-library @storybook/jest @storybook/addon-interactions',
        true,
        true
      )
    ).toMatchInlineSnapshot(
      `"yarn remove -D @storybook/testing-library@next @storybook/jest@next @storybook/addon-interactions@next"`
    );
  });
  it('appends the correct tag', () => {
    expect(updateSnippet('npx storybook init')).toMatchInlineSnapshot(
      `"npx storybook@latest init"`
    );
    expect(updateSnippet('npx storybook init', false, true)).toMatchInlineSnapshot(
      `"npx storybook@next init"`
    );
    // Must use block here to test effect (inline should not append tag)
    // When not prerelease, we do NOT append the tag to installed packages
    expect(updateSnippet('yarn add -D @storybook/testing-library', true)).toMatchInlineSnapshot(
      `"yarn add -D @storybook/testing-library"`
    );
    // Must use block here to test effect (inline should not append tag)
    expect(
      updateSnippet('yarn add -D @storybook/testing-library', true, true)
    ).toMatchInlineSnapshot(`"yarn add -D @storybook/testing-library@next"`);
  });
  it('does not append tag to removed packages', () => {
    // Must use block here to test effect (inline should not append tag)
    expect(
      updateSnippet('npx storybook remove @storybook/testing-library', true)
    ).toMatchInlineSnapshot(`"npx storybook@latest remove @storybook/testing-library"`);
    // Must use block here to test effect (inline should not append tag)
    expect(
      updateSnippet('npx storybook remove @storybook/testing-library', true, true)
    ).toMatchInlineSnapshot(`"npx storybook@next remove @storybook/testing-library"`);
  });
  it('removes existing tags', () => {
    expect(updateSnippet('npx storybook@latest init', false, true)).toMatchInlineSnapshot(
      `"npx storybook@next init"`
    );
    expect(updateSnippet('npx storybook@next init')).toMatchInlineSnapshot(
      `"npx storybook@latest init"`
    );
    // Must use block here to test effect (inline should do nothing)
    expect(
      updateSnippet('npx storybook@latest remove @storybook/testing-library', true, true)
    ).toMatchInlineSnapshot(`"npx storybook@next remove @storybook/testing-library"`);
    // Must use block here to test effect (inline should do nothing)
    expect(
      updateSnippet('npx storybook@next remove @storybook/testing-library', true)
    ).toMatchInlineSnapshot(`"npx storybook@latest remove @storybook/testing-library"`);
    // Must use block here to test effect (inline should not append tag)
    expect(
      updateSnippet('yarn add -D @storybook/testing-library@latest', true, true)
    ).toMatchInlineSnapshot(`"yarn add -D @storybook/testing-library@next"`);
    // Must use block here to test effect (inline should not append tag)
    // When not prerelease, we do NOT append the tag to installed packages
    expect(
      updateSnippet('yarn add -D @storybook/testing-library@next', true)
    ).toMatchInlineSnapshot(`"yarn add -D @storybook/testing-library"`);
  });
  it('handles CLI command flags and subcommands', () => {
    expect(updateSnippet('npx storybook init --builder <webpack5 | vite>')).toMatchInlineSnapshot(
      `"npx storybook@latest init --builder <webpack5 | vite>"`
    );
    expect(
      updateSnippet('npx storybook migrate storiesof-to-csf --glob="src/**/*.stories.tsx"')
    ).toMatchInlineSnapshot(
      `"npx storybook@latest migrate storiesof-to-csf --glob=\\"src/**/*.stories.tsx\\""`
    );
    expect(
      // Must use block here to test effect (inline should not append tag)
      // Must use preRelease here to test effect (non-preRelease should not append tag)
      updateSnippet('npm install @storybook/addon-a11y --save-dev', true, true)
    ).toMatchInlineSnapshot(`"npm install @storybook/addon-a11y@next --save-dev"`);
  });
  it('does not match `npm run storybook` or `yarn storybook`', () => {
    expect(updateSnippet('npm run storybook')).toMatchInlineSnapshot(`"npm run storybook"`);
    expect(updateSnippet('yarn storybook')).toMatchInlineSnapshot(`"yarn storybook"`);
  });
  it('does nothing for `storybook@next upgrade --prerelease`', () => {
    expect(updateSnippet('npx storybook@next upgrade --prerelease')).toMatchInlineSnapshot(
      `"npx storybook@next upgrade --prerelease"`
    );
  });
});
