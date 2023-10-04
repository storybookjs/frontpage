<div class="aside aside__no-top">

This recipe assumes that you are using Storybook >=7.0 using the [getting started guide](/docs/react/get-started/install). Don’t have this? Then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</div>

<RecipeHeader>

How to setup Bootstrap and Storybook

</RecipeHeader>

Bootstrap is a popular library for quickly building UI with ready-made CSS classes, while Storybook is a tool for creating and testing UI components in isolation. This post will show you how to integrate these two tools to create a powerful and flexible development environment for building user interfaces with Bootstrap.

This post will explain how to:

1. 🔌 Setup Bootstrap in Storybook using CSS or Sass
2. 🎨 Switch betweens themes in a click

If you’d like to see the example code of this recipe, check out the [example repository](https://github.com/Integrayshaun/bootstrap-storybook-example) on GitHub. Let's get started!

![Completed styled-components example with theme switcher](https://raw.githubusercontent.com/Integrayshaun/bootstrap-storybook-example/main/.storybook/demo-recording.gif)

## How to setup `Bootstrap`

### CSS

Import the Bootstrap files in your `.storybook/preview.js` file.

```js
// .storybook/preview.js
import 'bootstrap/dist/css/bootstrap.min.css';

// Only import this if you want to use Bootstrap's
// JQuery helpers
import 'bootstrap/dist/js/bootstrap.bundle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
```

### Sass

If you're using Sass in a Webpack based Storybook (Other than Next or Angular), you'll need to install the [`@storybook/addon-styling-webpack`](https://storybook.js.org/addons/@storybook/addon-styling-webpack) addon.

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-styling-webpack
```

This will run a configuration script that will walk you through setting up the addon. If prompted, select `Sass` in the configuration options.

## Add a theme switcher

Bootstrap now ships with a dark mode that you can activate by adding a `[data-bs-theme]` data attribute to a parent element.

You can use [@storybook/addon-themes](https://storybook.js.org/addons/@storybook/addon-themes/) to add a theme switcher to your stories.

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-themes
```

Then, to enable switching between these modes in a click for your stories, use our `withThemeByDataAttribute` decorator by adding the following code to your `.storybook/preview.js` file.

```js
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// snipped for brevity

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-bs-theme',
  }),
];
```

## Get involved

Now you're ready to use Bootstrap with Storybook. 🎉 Check out the [example repo](https://github.com/Integrayshaun/bootstrap-storybook-example) for a quick start.

If you use Bootstrap at work, we'd love your feedback on the Bootstrap + Storybook experience. Join the maintainers in [Discord](https://discord.gg/storybook) to get involved, or jump into [addon docs](/docs/react/addons/introduction).
