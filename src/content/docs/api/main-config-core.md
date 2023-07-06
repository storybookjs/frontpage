---
title: 'core'
---

Parent: [main.js|ts configuration](./main-config.md)

Type:

```ts
{
  builder?: string | { name: string; options?: BuilderOptions };
  channelOptions?: ChannelOptions;
  crossOriginIsolated?: boolean;
  disableProjectJson?: boolean;
  disableTelemetry?: boolean;
  disableWebpackDefaults?: boolean;
  enableCrashReports?: boolean;
  renderer?: RendererName;
}
```

Configures Storybook's internal features.

## `builder`

Type:

```ts
| '@storybook/builder-vite' | '@storybook/builder-webpack5'
| {
    name: '@storybook/builder-vite' | '@storybook/builder-webpack5';
    options?: BuilderOptions;
  }
```

Configures Storybook's builder, [Vite](../builders/vite.md) or [Webpack](../builders/webpack.md).

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-core-builder.js.mdx',
    'common/main-config-core-builder.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## `channelOptions`

Type: `ChannelOptions`

```ts
{
  allowClass: boolean;
  allowDate: boolean;
  allowFunction: boolean;
  allowRegExp: boolean;
  allowSymbol: boolean;
  allowUndefined: boolean;
  lazyEval: boolean;
  maxDepth: number;
  space: number | undefined;
}
```

Configures the channel used by Storybook to communicate between the manager and preview.

Only two properties are likely to be used:

### `channelOptions.allowFunction`

Type: `boolean`

Default: `false`

Enables serializing functions across the channel, which can be a security risk.

### `channelOptions.maxDepth`

Type: `number`

Default: `3`

The maximum depth of nested objects to serialize across the channel. Larger values will be slower.

## `crossOriginIsolated`

Type: `boolean`

Enable CORS headings to run document in a "secure context". See [SharedArrayBuffer security requirements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements)

This enables these headers in development-mode:

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-core-cross-origin-isolated.js.mdx',
    'common/main-config-core-cross-origin-isolated.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## `disableProjectJson`

Type: `boolean`

Disables the generation of `project.json`, a file containing Storybook metadata

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-core-disable-project-json.js.mdx',
    'common/main-config-core-disable-project-json.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## `disableTelemetry`

Type: `boolean`

Disables Storybook's [telemetry collection](../configure/telemetry.md).

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-core-disable-telemetry.js.mdx',
    'common/main-config-core-disable-telemetry.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## `disableWebpackDefaults`

Type: `boolean`

Disables Storybook's default Webpack configuration.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-core-disable-webpack-defaults.js.mdx',
    'common/main-config-core-disable-webpack-defaults.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## `enableCrashReports`

Type: `boolean`

Enable crash reports to be sent to Storybook [telemetry](../configure/telemetry.md).

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-core-enable-crash-reports.js.mdx',
    'common/main-config-core-enable-crash-reports.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## `renderer`

Type: `RendererName`

<!-- TOOD: Is this used? Should it be documented? -->
