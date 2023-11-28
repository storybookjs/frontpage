import { getResolvedPaths } from './CodeSnippets';

function statefulGetResolvedPaths(
  paths,
  currentRenderer,
  currentCodeLanguage,
  currentPackageManager,
  ifContextRenderer?: string[]
) {
  return getResolvedPaths(paths, {
    currentCodeLanguage,
    currentPackageManager,
    currentRenderer,
    defaultRenderer: 'react',
    ifContextRenderer,
    latestVersion: 7.4,
    version: 7.4,
  });
}

it('Selects from available frameworks and languages, JS selected', () => {
  const result = statefulGetResolvedPaths(
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
    'js',
    'npm'
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
  const result = statefulGetResolvedPaths(
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
    'ts',
    'npm'
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
    const result = statefulGetResolvedPaths(
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
      'ts-4-9',
      'npm'
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
    const result = statefulGetResolvedPaths(
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
      'ts',
      'npm'
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
  const result = statefulGetResolvedPaths(
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
    'ts',
    'npm'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.js.mdx",
      ],
      <MissingCodeLanguage
        currentCodeLanguage="ts"
      />,
    ]
  `);
});

it('Falls back to TS, if JS is unavailable', () => {
  const result = statefulGetResolvedPaths(
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
    'js',
    'npm'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.ts.mdx",
      ],
      <MissingCodeLanguage
        currentCodeLanguage="js"
        fallbackLanguage="ts"
      />,
    ]
  `);
});

it('Falls back to common, if available', () => {
  const result = statefulGetResolvedPaths(
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
    'js',
    'npm'
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
  const result = statefulGetResolvedPaths(
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
    'ts',
    'npm'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "common/example.js.mdx",
      ],
      <MissingCodeLanguage
        currentCodeLanguage="ts"
      />,
    ]
  `);
});

it('Falls back to default language, if common is unavailable', () => {
  const result = statefulGetResolvedPaths(
    [
      'react/example.js.mdx',
      'react/example.ts.mdx',
      'vue/example.2.js.mdx',
      'vue/example.2.ts.mdx',
      'vue/example.3.js.mdx',
      'vue/example.3.ts.mdx',
    ],
    'angular',
    'js',
    'npm'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.js.mdx",
      ],
      <MissingRenderer
        currentRenderer="angular"
        defaultRenderer="react"
      />,
    ]
  `);
});

it('Falls back to JS default language, if TS default language is unavailable', () => {
  const result = statefulGetResolvedPaths(
    [
      'react/example.js.mdx',
      'vue/example.2.js.mdx',
      'vue/example.2.ts.mdx',
      'vue/example.3.js.mdx',
      'vue/example.3.ts.mdx',
    ],
    'angular',
    'ts',
    'npm'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "react/example.js.mdx",
      ],
      <MissingCodeLanguage
        currentCodeLanguage="ts"
      />,
    ]
  `);
});

it('Show package manager snippets, if available', () => {
  const result = statefulGetResolvedPaths(
    [
      'angular/example.with-builder.js.mdx',
      'common/example.npm.js.mdx',
      'common/example.yarn.js.mdx',
      'common/example.pnpm.js.mdx',
    ],
    'angular',
    'ts',
    'npm'
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
  const result = statefulGetResolvedPaths(
    [
      'angular/example.with-builder.js.mdx',
      'common/example.npm.js.mdx',
      'common/example.yarn.js.mdx',
      'common/example.pnpm.js.mdx',
    ],
    'react',
    'ts',
    'npm'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "common/example.npm.js.mdx",
      ],
      undefined,
    ]
  `);
});

it('Handles only common snippets, TS selected', () => {
  const result = statefulGetResolvedPaths(
    // prettier-ignore
    [
      'common/example.js.mdx',
      'common/example.ts.mdx'
    ],
    'react',
    'ts',
    'npm'
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
  const result = statefulGetResolvedPaths(
    // prettier-ignore
    [
      'common/example.js.mdx',
    ],
    'react',
    'ts',
    'npm'
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
  const result = statefulGetResolvedPaths(
    // prettier-ignore
    [
      'common/example.ts.mdx'
    ],
    'react',
    'js',
    'npm'
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "common/example.ts.mdx",
      ],
      <MissingCodeLanguage
        currentCodeLanguage="js"
      />,
    ]
  `);
});

it('Handles only MDX snippets, JS selected', () => {
  const result = statefulGetResolvedPaths(
    [
      'react/example.mdx.mdx',
      'angular/example.mdx.mdx',
      'vue/example.mdx-2.mdx',
      'vue/example.mdx-3.mdx',
      'svelte/example.mdx.mdx',
    ],
    'react',
    'js',
    'npm'
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
  const result = statefulGetResolvedPaths(
    [
      'react/example.mdx.mdx',
      'angular/example.mdx.mdx',
      'vue/example.mdx-2.mdx',
      'vue/example.mdx-3.mdx',
      'svelte/example.mdx.mdx',
    ],
    'vue',
    'js',
    'npm'
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
  const result = statefulGetResolvedPaths(
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
    'js',
    'npm'
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
  const result = statefulGetResolvedPaths(
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
    'js',
    'npm'
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
    statefulGetResolvedPaths(
      // prettier-ignore
      [
        'svelte/example.ts.mdx',
      ],
      'vue',
      'js',
      'npm'
    );
  }).toThrow();
});

it('Falls back to match parent If context', () => {
  const result = statefulGetResolvedPaths(
    // prettier-ignore
    ['svelte/example.ts.mdx'],
    'vue',
    'js',
    'npm',
    ['svelte']
  );
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "svelte/example.ts.mdx",
      ],
      <MissingCodeLanguage
        currentCodeLanguage="js"
      />,
    ]
  `);
});

it('Throws if no snippets available, including parent If context', () => {
  expect(() => {
    statefulGetResolvedPaths(
      // prettier-ignore
      [
        'svelte/example.ts.mdx',
      ],
      'vue',
      'js',
      'npm',
      ['react']
    );
  }).toThrow();
});
