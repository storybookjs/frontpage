---
title: 'framework'
---

(**Required**)

Parent: [main.js|ts configuration](./main-config.md)

Type: `FrameworkName | { name: FrameworkName; options?: FrameworkOptions }`

Configures Storybook based on a set of [framework-specific](../configure/frameworks.md) settings.

For available frameworks and their options, see their respective [documentation](https://github.com/storybookjs/storybook/tree/next/code/frameworks).

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-framework.js.mdx',
    'common/main-config-framework.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->
