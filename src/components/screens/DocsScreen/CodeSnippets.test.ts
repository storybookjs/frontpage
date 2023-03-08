import { getResolvedPaths } from './CodeSnippets';

it('Selects from available frameworks and languages, JS selected', () => {
  const result = getResolvedPaths(
    [
      'common/example.js.mdx',
      'common/example.ts.mdx',
      'react/example.js.mdx',
      'react/example.ts.mdx',
      'vue/example.ts-2.js.mdx',
      'vue/example.ts-2.ts.mdx',
      'vue/example.ts-3.js.mdx',
      'vue/example.ts-3.ts.mdx',
    ],
    'react',
    'js'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.js.mdx",
      ],
      undefined,
    ]
  `);
});

it('Selects from available frameworks and languages, TS selected', () => {
  const result = getResolvedPaths(
    [
      'common/example.js.mdx',
      'common/example.ts.mdx',
      'react/example.js.mdx',
      'react/example.ts.mdx',
      'vue/example.ts-2.js.mdx',
      'vue/example.ts-2.ts.mdx',
      'vue/example.ts-3.js.mdx',
      'vue/example.ts-3.ts.mdx',
    ],
    'react',
    'ts'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.ts.mdx",
      ],
      undefined,
    ]
  `);
});

// Un-skip once v7 is "latest"
it.skip('Selects from available frameworks and languages, TS 4.9 selected', () => {
  const result = getResolvedPaths(
    [
      'common/example.js.mdx',
      'common/example.ts.mdx',
      'react/example.js.mdx',
      'react/example.ts.mdx',
      'vue/example.ts-2.js.mdx',
      'vue/example.ts-2.ts.mdx',
      'vue/example.ts-3.js.mdx',
      'vue/example.ts-3.ts.mdx',
    ],
    'react',
    'ts-4-9'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.ts-4-9.mdx",
      ],
      undefined,
    ]
  `);
});

it('Falls back to JS, if TS is unavailable', () => {
  const result = getResolvedPaths(
    [
      'common/example.js.mdx',
      'common/example.ts.mdx',
      'react/example.js.mdx',
      'vue/example.ts-2.js.mdx',
      'vue/example.ts-2.ts.mdx',
      'vue/example.ts-3.js.mdx',
      'vue/example.ts-3.ts.mdx',
    ],
    'react',
    'ts'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.js.mdx",
      ],
      <MissingCodeLanguageMessage
        currentCodeLanguage="ts"
        currentFramework="react"
      />,
    ]
  `);
});

it('Falls back to TS, if JS is unavailable', () => {
  const result = getResolvedPaths(
    [
      'common/example.js.mdx',
      'common/example.ts.mdx',
      'react/example.ts.mdx',
      'vue/example.ts-2.js.mdx',
      'vue/example.ts-2.ts.mdx',
      'vue/example.ts-3.js.mdx',
      'vue/example.ts-3.ts.mdx',
    ],
    'react',
    'js'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.ts.mdx",
      ],
      <MissingCodeLanguageMessage
        currentCodeLanguage="js"
        currentFramework="react"
        fallbackLanguage="ts"
      />,
    ]
  `);
});

it('Falls back to common, if available', () => {
  const result = getResolvedPaths(
    [
      'common/example.js.mdx',
      'common/example.ts.mdx',
      'react/example.js.mdx',
      'react/example.ts.mdx',
      'vue/example.ts-2.js.mdx',
      'vue/example.ts-2.ts.mdx',
      'vue/example.ts-3.js.mdx',
      'vue/example.ts-3.ts.mdx',
    ],
    'angular',
    'js'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "common/example.js.mdx",
      ],
      undefined,
    ]
  `);
});

it('Falls back to JS common, if TS common is unavailable', () => {
  const result = getResolvedPaths(
    [
      'common/example.js.mdx',
      'react/example.js.mdx',
      'react/example.ts.mdx',
      'vue/example.ts-2.js.mdx',
      'vue/example.ts-2.ts.mdx',
      'vue/example.ts-3.js.mdx',
      'vue/example.ts-3.ts.mdx',
    ],
    'angular',
    'ts'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "common/example.js.mdx",
      ],
      <MissingCodeLanguageMessage
        currentCodeLanguage="ts"
        currentFramework="angular"
      />,
    ]
  `);
});

it('Falls back to default language, if common is unavailable', () => {
  const result = getResolvedPaths(
    [
      'react/example.js.mdx',
      'react/example.ts.mdx',
      'vue/example.ts-2.js.mdx',
      'vue/example.ts-2.ts.mdx',
      'vue/example.ts-3.js.mdx',
      'vue/example.ts-3.ts.mdx',
    ],
    'angular',
    'js'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.js.mdx",
      ],
      <MissingFrameworkMessage
        currentFramework="angular"
      />,
    ]
  `);
});

it('Falls back to JS default language, if TS default language is unavailable', () => {
  const result = getResolvedPaths(
    [
      'react/example.js.mdx',
      'vue/example.ts-2.js.mdx',
      'vue/example.ts-2.ts.mdx',
      'vue/example.ts-3.js.mdx',
      'vue/example.ts-3.ts.mdx',
    ],
    'angular',
    'ts'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.js.mdx",
      ],
      <MissingCodeLanguageMessage
        currentCodeLanguage="ts"
        currentFramework="angular"
      />,
    ]
  `);
});

it('Show framework package manager snippets, if available', () => {
  const result = getResolvedPaths(
    [
      'angular/storybook-run-dev.with-builder.js.mdx',
      'common/storybook-run-dev.npm.js.mdx',
      'common/storybook-run-dev.yarn.js.mdx',
      'common/storybook-run-dev.pnpm.js.mdx',
    ],
    'angular',
    'ts'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "angular/storybook-run-dev.with-builder.js.mdx",
      ],
      undefined,
    ]
  `);
});

it('Fallback to common package manager snippets', () => {
  const result = getResolvedPaths(
    [
      'angular/storybook-run-dev.with-builder.js.mdx',
      'common/storybook-run-dev.npm.js.mdx',
      'common/storybook-run-dev.yarn.js.mdx',
      'common/storybook-run-dev.pnpm.js.mdx',
    ],
    'react',
    'ts'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "common/storybook-run-dev.npm.js.mdx",
        "common/storybook-run-dev.yarn.js.mdx",
        "common/storybook-run-dev.pnpm.js.mdx",
      ],
      undefined,
    ]
  `);
});

it('Handles only common snippets, TS selected', () => {
  const result = getResolvedPaths(
    // prettier-ignore
    [
      'common/example.js.mdx',
      'common/example.ts.mdx'
    ],
    'react',
    'ts'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "common/example.ts.mdx",
      ],
      undefined,
    ]
  `);
});

it('Handles only common JS snippets, TS selected', () => {
  const result = getResolvedPaths(
    // prettier-ignore
    [
      'common/example.js.mdx',
    ],
    'react',
    'ts'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "common/example.js.mdx",
      ],
      <MissingCodeLanguageMessage
        currentCodeLanguage="ts"
        currentFramework="react"
      />,
    ]
  `);
});

it('Handles only common TS snippets, JS selected', () => {
  const result = getResolvedPaths(
    // prettier-ignore
    [
      'common/example.ts.mdx'
    ],
    'react',
    'js'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "common/example.ts.mdx",
      ],
      <MissingCodeLanguageMessage
        currentCodeLanguage="js"
        currentFramework="react"
        fallbackLanguage="ts"
      />,
    ]
  `);
});
