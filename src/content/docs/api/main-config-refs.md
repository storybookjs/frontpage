---
title: 'refs'
---

Parent: [main.js|ts configuration](./main-config.md)

Type:

```ts
{ [key: string]:
  | { title: string; url: string; expanded?: boolean }
  | (config: { title: string; url: string; expanded?: boolean }) => { title: string; url: string; expanded?: boolean }
  | { disable: boolean }
}
```

Configures [Storybook composition](../sharing/storybook-composition.md).

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-refs.js.mdx',
    'common/main-config-refs.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## Using a function

You can use a function to dynamically configure refs:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-refs-with-function.js.mdx',
    'common/main-config-refs-with-function.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## Disable a ref

Some package dependencies automatically [compose their Storybook in yours](../sharing/package-composition.md). You can disable this behavior by setting `disable` to `true` for the package name:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-refs-disable.js.mdx',
    'common/main-config-refs-disable.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->
