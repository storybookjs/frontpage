<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you are using Storybook >=7.0 using the [getting started guide](/docs/react/get-started/install). Don’t have this? Then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</Callout>

## 1. Import `Bootstrap`

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

<Callout variant="info" icon="💡" title="Using Sass?">

Check out our [Sass recipe](/docs/react/recipes/sass) for instructions on how to configure Storybook to work with Sass.

</Callout>

## 2. Add a theme switcher

Bootstrap now ships with a dark mode that you can activate by adding a `[data-bs-theme]` data attribute to a parent element.

You can use [@storybook/addon-themes](https://storybook.js.org/addons/@storybook/addon-themes/) to add a theme switcher to your stories.

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-themes
```

<details>
  <summary>Did the configuration script fail?</summary>
  <p>Under the hood, this runs <code>npx @storybook/auto-config themes</code> which should read your project and try to configure your Storybook with the correct decorator. If running that command directly does not solve your problem, please file a bug on the <a href="https://github.com/storybookjs/auto-config/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D" target="_blank">@storybook/auto-config</a> repository for that we can make this good as can be. To manually add this addon, install it then add it to the addons array in your <code>.storybook/main.ts</code>.</p>
</details>

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

If you use Bootstrap at work, we'd love your feedback on the Bootstrap + Storybook experience. Join the maintainers in [Discord](https://discord.gg/storybook) to get involved, or jump into [addon docs](/docs/addons).
