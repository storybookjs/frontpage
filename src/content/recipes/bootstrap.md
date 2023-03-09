<div class="aside aside__no-top">

This recipe assumes that you are using Storybook >=6.0 using the [getting started guide](/docs/react/get-started/install). Don’t have this? Then run:

```shell
# Add Storybook:
npx sb init
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

Start by installing some dependencies.

```shell
yarn add -D @storybook/addon-styling
```

Now register the addon styling in your `.storybook/main.js`.

```js
module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-styling'],
};
```

Finally, import the Bootstrap files in your `.storybook/preview.js` file.

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

Start by installing some dependencies.

```shell
yarn add -D @storybook/addon-styling sass sass-loader resolve-url-loader
```

Now register the addon styling in your `.storybook/main.js`

```js
module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          // Require your Sass preprocessor here
          implementation: require('sass'),
        },
      },
    },
  ],
};
```

Finally, import your `index.scss` file in your `.storybook/preview.js` file.

```scss
// ./src/index.scss

// Include any default variable overrides here (though functions won't be available)

@import '../node_modules/bootstrap/scss/bootstrap';

// Then add additional custom code here
```

```js
// .storybook/preview.js

import '../src/index.scss';

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

## Add a theme switcher

Bootstrap now ships with a dark mode that you can activate by adding a `[data-bs-theme]` data attribute to a parent element.

To enable switching between these modes in a click for your stories, use our `withThemeByDataAttribute` decorator by adding the following code to your `.storybook/preview.js` file.

```js
import { withThemeByDataAttribute } from '@storybook/addon-styling';

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
