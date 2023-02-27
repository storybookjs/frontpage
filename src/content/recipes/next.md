<div class="aside aside__no-top">

This recipe assumes that you are using Next.js >= 12.x as well as Storybook >= 7.x

</div>

<RecipeHeader>

How to setup Next.js and Storybook

</RecipeHeader>

Next.js is used in tens of thousands of websites and apps. With the recent release of v13, it’s more capable than ever, including many improvements to key features like routing and image optimization. But with all this change, it can be tough to migrate your existing Next app, much less everything it integrates with.

Storybook is the de facto standard for isolated component development. We're excited to make Next.js 13 features available in Storybook with our new `@storybook/nextjs` framework package. It automatically configures Storybook to mirror Next.js 12 and 13 project settings. Here’s what’s included:

🔀 Routing
🖼 Image optimization
⤵️ Absolute imports
🎨 Styling
🎛 Webpack & Babel config
💫 and [more](https://github.com/storybookjs/storybook/blob/next/code/frameworks/nextjs/README.md#supported-features)!

## In a project without Storybook

Follow the prompts after running this command in your Next.js project's root directory:

npx storybook@next init
More on getting started with Storybook

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

## Get involved

Now you're ready to use Next.js with Storybook. 🎉 If you use Nextjs at work, we'd love your feedback on the Next + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
