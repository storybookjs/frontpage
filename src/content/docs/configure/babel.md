---
title: 'Babel'
---

As of version 7.0, Storybook now re-uses your project’s Babel configuration to apply the same Babel plugins and presets in your Storybook stories as you do in your app. This makes it simpler, less buggy, easier to troubleshoot, and more consistent with other tools in the JS ecosystem.

<Callout variant="info">

If you're not using Storybook 7, please reference the [previous documentation](../../../release-6-5/docs/configure/babel.md) for guidance on configuring your Babel setup.

</Callout>

## CRA (Create React App)

[CRA](https://create-react-app.dev/) apps using `@storybook/react-webpack5` with the `@storybook/preset-create-react-app` package use CRA's Babel handling to behave as close as possible to your actual application. None of the other documentation on this page applies.

## Configuring

In Storybook 7, you are responsible for configuring Babel using your `.babelrc` file, and Storybook does not provide any default. Storybook's frameworks and addons may provide minor programmatic modifications to the Babel configuration.

## Migrating from V6

For detailed instructions on migrating from `V6` mode, please see [MIGRATION.md](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#babel-mode-v7-exclusively).

## Generate a babelrc

If your app does not include a babelrc file, and you need one, you can create it by running the following command in your project directory:

```sh
npx storybook@latest babelrc
```

Once the command completes, you should have a `.babelrc.json` file created in the root directory of your project, similar to the following example:

<details>
<summary>Example Babel configuration</summary>

```json
{
  "sourceType": "unambiguous",
  "presets": [
    [
      "@babel/preset-env",
      {
        "shippedProposals": true,
        "loose": true
      }
    ],
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-shorthand-properties",
    "@babel/plugin-transform-block-scoping",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    [
      "@babel/plugin-proposal-private-methods",
      {
        "loose": true
      }
    ],
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-object-rest-spread",
      {
        "loose": true,
        "useBuiltIns": true
      }
    ],
    "@babel/plugin-transform-classes",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-parameters",
    "@babel/plugin-transform-destructuring",
    "@babel/plugin-transform-spread",
    "@babel/plugin-transform-for-of",
    "babel-plugin-macros",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    [
      "babel-plugin-polyfill-corejs3",
      {
        "method": "usage-global",
        "absoluteImports": "core-js",
        "version": "3.18.3"
      }
    ]
  ]
}
```

</details>

Depending on your environment, you may need to install additional package dependencies.

### Babelrc vs. Babel config

Babel has two different configuration modes: babelrc and Babel config. As explained in more detail [in Babel's docs](https://babeljs.io/docs/en/config-files):

- **babelrc** configures Babel for files in the same folder (or descendant folders) of the location of the babelrc
- **Babel config** configures Babel globally

Babel recommends to use babelrc, and it's what Storybook generates when you run `npx storybook babelrc`. If your stories are located in the current project directory (e.g., `stories: ['../src/**/*.stories.js']`) this approach will work well.
However, when your Storybook refers to files outside of the current project directory (e.g., `stories: ['../../some-other-directory/**/*.stories.js']`), the babelrc will not apply to those files. However, a Babel config will, and is the recommended approach in that situation.

## Troubleshooting

### Babel configuration not working

To troubleshoot your Babel configuration, set the `BABEL_SHOW_CONFIG_FOR` environment variable. For example, to see how Storybook is transpiling your `.storybook/preview.js` file, add the following environment variable:

```sh
BABEL_SHOW_CONFIG_FOR=.storybook/preview.js yarn storybook
```

When the command finishes running, it will display the available Babel configuration for the `.storybook/preview.js` file. You can use this information to debug issues with transpilation.

<Callout variant="info" icon="💡">

Due to what appears to be a Babel bug, setting this flag causes Babel transpilation to fail on the file provided. Thus you cannot actually **run** Storybook using this command. However, it will print out the configuration information as advertised, and therefore you can use this to debug your Storybook. You'll need to remove the flag to actually run your Storybook.

</Callout>

For more info, please refer to the [Babel documentation](https://babeljs.io/docs/en/configuration#print-effective-configs).

### SWC alternative

(⚠️ **Experimental**)

If you're working with a Webpack-based project, you can opt into replacing Babel with the [SWC](https://swc.rs/) compiler, which can be faster for some projects. To do so, update your [Storybook configuration file](../api/main-config.md) (e.g., `.storybook/main.js|ts`) to enable the experimental `useSWC` option:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-framework-options-builder-use-swc.js.mdx',
    'common/main-config-framework-options-builder-use-swc.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

See the [`useSWC` API reference](../api/main-config-framework.md#optionsbuilderuseswc) for more information.
