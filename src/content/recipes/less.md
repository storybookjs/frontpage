<div class="aside aside__no-top">

This recipe assumes that you are using Storybook >= 7.0. If you haven't set up Storybook yet, run the following command in the root of your project:

```shell
npx storybook@latest init
```

</div>

<RecipeHeader>

How to setup Less and Storybook

</RecipeHeader>

Less is a popular CSS preprocessor that allows developers to write more maintainable and reusable stylesheets. Storybook is an industry-standard tool for developing and testing UI components in isolation. With the help of the `@storybook/addon-styling` package, developers can easily incorporate Less stylesheets into their Storybook components.

## Adding `@storybook/addon-styling`

<div class="aside aside__no-top">

Using Vite to build your Storybook? Then you don't need to add `options.less` as Vite works with Less out-of-the-box 🎉

</div>

First of all, install the required dependencies:

```shell
yarn add -D @storybook/addon-styling less
```

Then register `@storybook/addon-styling` in your `main.js` like so:

```js
module.exports = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-styling',
      options: {
        less: {
          // Require your Less preprocessor here
          implementation: require('less'),
        },
      },
    },
  ],
};
```

## Import global styles

If you have any global styles you would like to expose for your stories, you can now import them into your `preview.js` file:

```js
// .storybook/preview.js
import '../src/index.less';
```

## Get involved

Now you're ready to use Less with Storybook. 🎉 If you use Less at work, we'd love your feedback on the Less + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
