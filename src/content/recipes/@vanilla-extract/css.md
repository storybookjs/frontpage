<div class="aside aside__no-top">

This recipe assumes that you are using Storybook >= 7.0. If you haven't set up Storybook yet, run the following command in the root of your project:

```shell
npx storybook@latest init
```

</div>

<RecipeHeader>

How to setup Vanilla Extract and Storybook

</RecipeHeader>

Vanilla Extract Uses TypeScript as your CSS preprocessor. Allowing you to write type‑safe, locally scoped classes, variables and themes, then generate static CSS files at build time. Storybook is an industry-standard tool for developing and testing UI components in isolation.

## Configure your Storybook builder

<div class="aside aside__no-top">

If you're already using Vanilla Extract in your project, you may already have these dependencies installed.

</div>

First of all, install the required dependencies:

```shell
# For Vite users
yarn add -D @vanilla-extract/vite-plugin

# For Webpack users
yarn add -D @vanilla-extract/webpack-plugin mini-css-extract-plugin
```

### Vite

For Vite users, Storybook uses your project's `vite.config.js` for its build configuration. This means if your project uses Vanilla Extract, it's also already configured for your Storybook. 🎉

You can view a full example on [Stackblitz](https://stackblitz.com/edit/github-cytqag?file=.storybook/main.ts).

### Webpack

For Webpack users, [@storybook/addon-styling-webpack](https://storybook.js.org/addons/@storybook/addon-styling-webpack/) can get your Storybook up and running with Vanilla Extract in a few lines of code.

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-styling-webpack
```

This will run a configuration script that will walk you through setting up the addon. If prompted, select `Vanilla Extract` as your CSS processor.

### Manually configure Webpack

For an example of manual configuration, you can view a full example on [Stackblitz](https://stackblitz.com/edit/sb-vanilla-extract-webpack?file=.storybook/main.ts).

## Get involved

Now you're ready to use Vanilla Extract with Storybook. 🎉 If you use Vanilla Extract at work, we'd love your feedback on the Vanilla Extract + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
