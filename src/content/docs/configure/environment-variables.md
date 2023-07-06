---
title: 'Environment variables'
---

You can use environment variables in Storybook to change its behavior in different “modes”.
If you supply an environment variable prefixed with `STORYBOOK_`, it will be available in `process.env` when using webpack, or `import.meta.env` when using the vite builder:

```shell
STORYBOOK_THEME=red STORYBOOK_DATA_KEY=12345 npm run storybook
```

<div class="aside">

💡 Do not store any secrets (e.g., private API keys) or other types of sensitive information in your Storybook. Environment variables are embedded into the build, meaning anyone can view them by inspecting your files.

</div>

Then we can access these environment variables anywhere inside our preview JavaScript code like below:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-read-environment-variables.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

You can also access these variables in your custom `<head>`/`<body>` using the substitution `%STORYBOOK_X%`, for example: `%STORYBOOK_THEME%` will become `red`.

<div class="aside">

💡 If using the environment variables as attributes or values in JavaScript, you may need to add quotes, as the value will be inserted directly. e.g. `<link rel="stylesheet" href="%STORYBOOK_STYLE_URL%" />`

</div>

### Using .env files

You can also use `.env` files to change Storybook's behavior in different modes. For example, if you add a `.env` file to your project with the following:

```
STORYBOOK_DATA_KEY=12345
```

Then you can access this environment variable anywhere, even within your stories:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/my-component-with-env-variables.js.mdx',
    'react/my-component-with-env-variables.ts.mdx',
    'vue/my-component-with-env-variables.js.mdx',
    'vue/my-component-with-env-variables.ts.mdx',
    'angular/my-component-with-env-variables.ts.mdx',
    'web-components/my-component-with-env-variables.js.mdx',
    'web-components/my-component-with-env-variables.ts.mdx',
    'svelte/my-component-with-env-variables.js.mdx',
    'solid/my-component-with-env-variables.js.mdx',
    'solid/my-component-with-env-variables.ts.mdx',
  ]}
  usesCsf3
  csf2Path="configure/environment-variables#snippet-my-component-with-env-variables"
/>

<!-- prettier-ignore-end -->

<div class="aside">
You can also use specific files for specific modes. Add a <code>.env.development</code> or <code>.env.production</code> to apply different values to your environment variables.
</div>

You can also pass these environment variables when you are [building your Storybook](../sharing/publish-storybook.md) with `build-storybook`.

Then they'll be hardcoded to the static version of your Storybook.

### Using Storybook configuration

Additionally, you can extend your Storybook configuration file (i.e., [`.storybook/main.js`](../configure/overview.md#configure-story-rendering)) and provide a configuration field that you can use to define specific variables (e.g., API URLs). For example:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-env.js.mdx',
    'common/main-config-env.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

When Storybook loads, it will enable you to access them in your stories similar as you would do if you were working with an `env` file:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'angular/my-component-env-var-config.ts.mdx',
    'web-components/my-component-env-var-config.js.mdx',
    'web-components/my-component-env-var-config.ts.mdx',
    'common/my-component-env-var-config.js.mdx',
    'common/my-component-env-var-config.ts.mdx',
  ]}
  usesCsf3
  csf2Path="configure/environment-variables#snippet-my-component-env-var-config"
/>

<!-- prettier-ignore-end -->

### Using environment variables to choose the browser

Storybook allows you to choose the browser you want to preview your stories. Either through a `.env` file entry or directly in your `storybook` script.

The table below lists the available options:

| Browser  | Example              |
| -------- | -------------------- |
| Safari   | `BROWSER="safari"`   |
| Firefox  | `BROWSER="firefox"`  |
| Chromium | `BROWSER="chromium"` |

<div class="aside">
💡 By default, Storybook will open a new Chrome window as part of its startup process. If you don't have Chrome installed, make sure to include one of the following options, or set your default browser accordingly.
</div>
