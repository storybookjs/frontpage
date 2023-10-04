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

## Before you begin

If you are using Vite as your Storybook builder, all you need to do is import your Less files into your `preview.js` file.

## Configure your Storybook builder

If you use Webpack to build your Storybook you'll need to install the [`@storybook/addon-styling-webpack`](https://storybook.js.org/addons/@storybook/addon-styling-webpack) addon.

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-styling-webpack
```

This will run a configuration script that will walk you through setting up the addon. When prompted, select `Less` from the configuration options.

## Import global styles

If you have any global styles you would like to expose for your stories, you can now import them into your `preview.js` file:

```js
// .storybook/preview.js
import '../src/index.less';
```

## Get involved

Now you're ready to use Less with Storybook. 🎉 If you use Less at work, we'd love your feedback on the Less + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
