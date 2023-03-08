import { getResolvedPaths } from './CodeSnippets';

it('runs', () => {
  const result = getResolvedPaths(
    [
      'common/example.js.mdx',
      'react/example.ts.mdx',
      'vue/example.ts-2.ts.mdx',
      'vue/example.ts-3.ts.mdx',
      'angular/example.ts.mdx',
      'web-components/example.js.mdx',
      'web-components/example.ts.mdx',
    ],
    'web-components'
  );
  expect(result).toMatchInlineSnapshot(`
    Array [
      Array [
        "common/example.js.mdx",
        "web-components/example.js.mdx",
        "web-components/example.ts.mdx",
        "web-components/example.ts-4-9.mdx",
      ],
      undefined,
    ]
  `);
});
