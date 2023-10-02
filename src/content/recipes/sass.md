<div class="aside aside__no-top">

Some configurations of Storybook already come pre-configured to support Sass. If your project meets the following, you're likely ready to go.

1. Storybook >= 7.x with the `vite` builder.
2. Storybook >= 7.x with the `@storybook/nextjs` framework.
3. Storybook >= 6.x with the `@storybook/preset-create-react-app` and `react-scripts@2.x.x` or higher.
4. Storybook >= 6.x with the `@storybook/angular` framework. Inject your global stylesheets into storybook through your `angular.json` file.

</div>

<RecipeHeader>

How to setup Sass and Storybook

</RecipeHeader>

Sass is a popular CSS preprocessor that allows developers to write more maintainable and reusable stylesheets. Storybook is an industry-standard tool for developing and testing UI components in isolation. With the help of the `@storybook/addon-styling-webpack` package, developers can easily incorporate Sass stylesheets into their Storybook components.

## Adding `@storybook/addon-styling-webpack`

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-styling-webpack
```

This will run a configuration script that will walk you through setting up the addon. When prompted, select `Sass` from the configuration options.

## Import global styles

If you have any global styles you would like to expose for your stories, you can now import them into your `preview.js` file:

```js
// .storybook/preview.js
import '../src/index.scss';
```

## Get involved

Now you're ready to use Sass with Storybook. 🎉 If you use Sass at work, we'd love your feedback on the Sass + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
