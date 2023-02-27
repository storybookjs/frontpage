<div class="aside aside__no-top">

This recipe assumes that you are using Next.js >= 12.x as well as Storybook >= 7.x

</div>

<RecipeHeader>

How to setup Next.js and Storybook

</RecipeHeader>

Tens of thousands of websites and apps rely on Next.js for its powerful features, and the latest release of version 13 has brought many improvements, particularly in routing and image optimization. However, transitioning your existing Next app, along with its integrations, can be a daunting task.

Fortunately, there is now an easier way to develop isolated components with the new `@storybook/nextjs` framework package. As an industry-standard for component development, Storybook is proud to offer Next.js 13 features in a seamless integration. With our package, Storybook automatically mirrors the project settings of both Next.js 12 and 13. Here's what you'll get:

- 🔀 Routing
- 🖼 Image optimization
- ⤵️ Absolute imports
- 🎨 Styling
- 🎛 Webpack & Babel config
- 💫 and [more](https://github.com/storybookjs/storybook/blob/next/code/frameworks/nextjs/README.md#supported-features)!

## In a project without Storybook

Follow the prompts after running this command in your Next.js project's root directory:

```shell
npx storybook@next init
```

## In a project with Storybook

This framework is designed to work with Storybook 7. If you’re not already using v7, upgrade with this command:

```shell
npx storybook@next upgrade --prerelease
```

### Automatic migration

When running the upgrade command above, you should get a prompt asking you to migrate to `@storybook/nextjs`, which should handle everything for you. In case that auto-migration does not work for your project, refer to the manual migration below.

### Manual migration

Install the framework:

```shell
yarn add --dev @storybook/nextjs@next
```

Update your main.js to change the framework property:

```js
// .storybook/main.js
export default {
  // ...
  framework: {
    // name: '@storybook/react-webpack5', // Remove this
    name: '@storybook/nextjs', // Add this
    options: {},
  },
};
```

If you were using Storybook plugins to integrate with Next.js, those are no longer necessary when using this framework and can be removed:

```js
// .storybook/main.js
export default {
  // ...
  addons: [
    // ...
    // These can both be removed
    // 'storybook-addon-next',
    // 'storybook-addon-next-router',
  ],
};
```

## Configuring next/navigation

Next.js 13 introduced the experimental app directory with new features and conventions. It brings support for nested routes and layouts.

If your story uses components in the app directory and they are importing modules from next/navigation, you have to tell Storybook to use the correct mocked router context by setting the nextjs.appDirectory parameter to true:

```js
export const Example = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
```

The Navigation provider is configured with some defaults. You can override those defaults by setting the parameter for nextjs.navigation:

```js
export const Example = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/profile,
        query: {
          user: 'santa',
        },
      },
    },
  },
};
```

Take a look at the [AppRouterProvider](https://github.com/storybookjs/storybook/blob/next/code/frameworks/nextjs/src/routing/app-router-provider.tsx#L15) for all available parameters.

## Configuring next/router

Within the pages directory, you should continue to use imports from next/router for routing purposes. If you want to configure the Router provider, you can do so by setting the nextjs.router parameter:

```js
export const Example = {
  parameters: {
    nextjs: {
      router: {
        basePath: '/profile',
      },
    },
  },
};
```

Take a look at the [PageRouterProvider](https://github.com/storybookjs/storybook/blob/next/code/frameworks/nextjs/src/routing/page-router-provider.tsx#L18) for all available parameters.

## Get involved

Now you're ready to use Next.js with Storybook. 🎉 If you use Nextjs at work, we'd love your feedback on the Next + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
