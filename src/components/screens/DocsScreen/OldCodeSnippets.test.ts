import { getResolvedPaths } from './OldCodeSnippets';

it('Selects from available frameworks and languages, JS selected', () => {
  const result = getResolvedPaths(
    [
      'common/example.js.mdx',
      'common/example.ts.mdx',
      'react/example.js.mdx',
      'react/example.ts.mdx',
      'vue/example.2.js.mdx',
      'vue/example.2.ts.mdx',
      'vue/example.3.js.mdx',
      'vue/example.3.ts.mdx',
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
      'vue/example.2.js.mdx',
      'vue/example.2.ts.mdx',
      'vue/example.3.js.mdx',
      'vue/example.3.ts.mdx',
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

describe('v7+', () => {
  it('Selects from available frameworks and languages, TS 4.9 selected', () => {
    const result = getResolvedPaths(
      [
        'common/example.js.mdx',
        'common/example.ts.mdx',
        'react/example.js.mdx',
        'react/example.ts.mdx',
        'vue/example.2.js.mdx',
        'vue/example.2.ts.mdx',
        'vue/example.3.js.mdx',
        'vue/example.3.ts.mdx',
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

  it('Does not select TS 4.9 paths when TS is selected', () => {
    const result = getResolvedPaths(
      [
        'common/example.js.mdx',
        'common/example.ts.mdx',
        'react/example.js.mdx',
        'react/example.ts.mdx',
        'vue/example.2.js.mdx',
        'vue/example.2.ts.mdx',
        'vue/example.3.js.mdx',
        'vue/example.3.ts.mdx',
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
});

it('Falls back to JS, if TS is unavailable', () => {
  const result = getResolvedPaths(
    [
      'common/example.js.mdx',
      'common/example.ts.mdx',
      'react/example.js.mdx',
      'vue/example.2.js.mdx',
      'vue/example.2.ts.mdx',
      'vue/example.3.js.mdx',
      'vue/example.3.ts.mdx',
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
      'vue/example.2.js.mdx',
      'vue/example.2.ts.mdx',
      'vue/example.3.js.mdx',
      'vue/example.3.ts.mdx',
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
      'vue/example.2.js.mdx',
      'vue/example.2.ts.mdx',
      'vue/example.3.js.mdx',
      'vue/example.3.ts.mdx',
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
      'vue/example.2.js.mdx',
      'vue/example.2.ts.mdx',
      'vue/example.3.js.mdx',
      'vue/example.3.ts.mdx',
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
      'vue/example.2.js.mdx',
      'vue/example.2.ts.mdx',
      'vue/example.3.js.mdx',
      'vue/example.3.ts.mdx',
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
      'vue/example.2.js.mdx',
      'vue/example.2.ts.mdx',
      'vue/example.3.js.mdx',
      'vue/example.3.ts.mdx',
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
      'angular/example.with-builder.js.mdx',
      'common/example.npm.js.mdx',
      'common/example.yarn.js.mdx',
      'common/example.pnpm.js.mdx',
    ],
    'angular',
    'ts'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "angular/example.with-builder.js.mdx",
      ],
      undefined,
    ]
  `);
});

it('Fallback to common package manager snippets', () => {
  const result = getResolvedPaths(
    [
      'angular/example.with-builder.js.mdx',
      'common/example.npm.js.mdx',
      'common/example.yarn.js.mdx',
      'common/example.pnpm.js.mdx',
    ],
    'react',
    'ts'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "common/example.npm.js.mdx",
        "common/example.yarn.js.mdx",
        "common/example.pnpm.js.mdx",
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
      undefined,
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
      />,
    ]
  `);
});

it('Handles only MDX snippets, JS selected', () => {
  const result = getResolvedPaths(
    [
      'react/example.mdx.mdx',
      'angular/example.mdx.mdx',
      'vue/example.mdx-2.mdx',
      'vue/example.mdx-3.mdx',
      'svelte/example.mdx.mdx',
    ],
    'react',
    'js'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.mdx.mdx",
      ],
      undefined,
    ]
  `);
});

it('Handles only MDX Vue 2/3 snippets, JS selected', () => {
  const result = getResolvedPaths(
    [
      'react/example.mdx.mdx',
      'angular/example.mdx.mdx',
      'vue/example.mdx-2.mdx',
      'vue/example.mdx-3.mdx',
      'svelte/example.mdx.mdx',
    ],
    'vue',
    'js'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "vue/example.mdx-2.mdx",
        "vue/example.mdx-3.mdx",
      ],
      undefined,
    ]
  `);
});

it('Handles MDX and JS snippets, JS selected', () => {
  const result = getResolvedPaths(
    [
      'react/example.js.mdx',
      'react/example.ts.mdx',
      'react/example.mdx.mdx',
      'vue/example.2.js.mdx',
      'vue/example.mdx-2.mdx.mdx',
      'vue/example.3.js.mdx',
      'vue/example.mdx-3.mdx.mdx',
    ],
    'react',
    'js'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.js.mdx",
        "react/example.mdx.mdx",
      ],
      undefined,
    ]
  `);
});

it('Falls back to non-JS/TS, JS selected', () => {
  const result = getResolvedPaths(
    [
      'react/example.js.mdx',
      'react/example.ts.mdx',
      'react/example.mdx.mdx',
      'vue/example.2.js.mdx',
      'vue/example.mdx-2.mdx.mdx',
      'vue/example.3.js.mdx',
      'vue/example.mdx-3.mdx.mdx',
      'svelte/example.native-format.mdx',
    ],
    'svelte',
    'js'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "svelte/example.native-format.mdx",
      ],
      undefined,
    ]
  `);
});

it('Throws if no snippets available', () => {
  expect(() => {
    getResolvedPaths(
      // prettier-ignore
      [
        'svelte/example.ts.mdx',
      ],
      'vue',
      'js'
    );
  }).toThrow();
});

it('Falls back to match parent If context', () => {
  const result = getResolvedPaths(
    // prettier-ignore
    ['svelte/example.ts.mdx'],
    'vue',
    'js',
    ['svelte']
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "svelte/example.ts.mdx",
      ],
      <MissingCodeLanguageMessage
        currentCodeLanguage="js"
        currentFramework="vue"
      />,
    ]
  `);
});

it('Throws if no snippets available, including parent If context', () => {
  expect(() => {
    getResolvedPaths(
      // prettier-ignore
      [
        'svelte/example.ts.mdx',
      ],
      'vue',
      'js',
      ['react']
    );
  }).toThrow();
});
