<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you have a React app using Tailwind CSS and have just set up **Storybook >=7.0** using the [getting started guide](/docs/react/get-started/install). Don’t have this? Follow Tailwind's [setup instructions](https://tailwindcss.com/docs/installation) then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</Callout>

## 1. Configure PostCSS


<Callout variant="info" icon="📣" title="Before you begin" style={{ marginBottom: '10px' }}>

Tailwind uses PostCSS to compile your CSS. If you are using:
-  `vite`
-  `@storybook/nextjs`
-  `@storybook/preset-create-react-app` with `react-scripts@2.0.0`
-  `@storybook/angular`
  
then you can skip to the [next step](#2-provide-tailwind-to-stories).

</Callout>



For Webpack users, you'll need to install the [`@storybook/addon-styling-webpack`](https://storybook.js.org/addons/@storybook/addon-styling-webpack) addon.

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-styling-webpack
```

This will run a configuration script that will walk you through setting up the addon. If prompted, select `PostCSS` from the configuration options.

<details>
  <summary>Did the configuration script fail?</summary>
  <p>Under the hood, this command runs <code>npx @storybook/auto-config styling</code>, which is responsible for reading your project and attempting to configure your Storybook Webpack for your desired tools. If running that command directly does not resolve your issue, please consider filing a bug report on the <a href="https://github.com/storybookjs/auto-config/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D" target="_blank">@storybook/auto-config</a> repository so that we can further improve it. For manual configuration instructions for PostCSS, you can refer to the documentation <a href="https://github.com/storybookjs/addon-styling-webpack" target="_blank">here</a>.</p>
</details>

## 2. Provide Tailwind to stories

Now you can import the `tailwind.css` file into your `.storybook/preview.js` file. This will make Tailwind’s style classes available to all of your stories.

```js
// .storybook/preview.js

import '../src/tailwind.css'; // replace with the name of your tailwind css file
```

### 2.1. Angular

If you are using Angular, you will need to add the `tailwind.css` file to your `angular.json` file instead. This will make sure your styles are processed with PostCSS and are injected into the preview iframe where your stories are rendered.

```json
// angular.json
{
 "storybook": {
    "builder": "@storybook/angular:start-storybook",
    "options": {
      "browserTarget": "my-default-project:build",
      "styles": ["src/tailwind.css"]
    }
  } 
}
```

## 3. Add a theme switcher tool

Tailwind comes out of the box with a light and dark theme. You can override those themes and add more. To get the most out of your stories, you should have a way to toggle between all of your themes.

![Finished example of Tailwind CSS in Storybook with a theme switcher](https://user-images.githubusercontent.com/18172605/208201389-1f448dbb-978c-442e-9d6b-7bf3fea63e64.gif)

First of all, update your `tailwind.config.js` file to [change themes based on a class or data-attribute](https://tailwindcss.com/docs/dark-mode#customizing-the-class-name). This example uses a data-attribute.

```js
// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Toggle dark-mode based on .dark class or data-mode="dark"
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Next, install the [`@storybook/addon-themes`](https://storybook.js.org/addons/@storybook/addon-themes/) addon to provide the switcher tool.

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-themes
```

This will run a configuration script that will walk you through setting up the addon.

<details>
  <summary>Did the configuration script fail?</summary>
  <p>Under the hood, this runs <code>npx @storybook/auto-config themes</code>, which should read your project and try to configure your Storybook with the correct decorator. If running that command directly does not solve your problem, please file a bug on the <a href="https://github.com/storybookjs/auto-config/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D" target="_blank">@storybook/auto-config</a> repository so that we can further improve it. To manually add this addon, install it, and then add it to the addons array in your <code>.storybook/main.ts</code>.</p>
</details>

### 3.1. Toggle themes by class name

Add the [`withThemeByClassName`](https://github.com/storybookjs/addon-themes/blob/main/code/addons/themes/docs/api.md#withthemebyclassname) decorator to your Storybook from `@storybook/addon-themes`

```js
// .storybook/preview.js
import { withThemeByClassName } from '@storybook/addon-themes';

/* snipped for brevity */

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];
```

### 3.2. Toggle themes by data-attribute

Add the [`withThemeByDataAttribute`](https://github.com/storybookjs/addon-themes/blob/main/code/addons/themes/docs/api.md#withthemebydataattribute) decorator to your Storybook from `@storybook/addon-themes`

```js
// .storybook/preview.js
import { withThemeByDataAttribute } from '@storybook/addon-themes';

/* snipped for brevity */

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-mode',
  }),
];
```

This code will create a new toolbar menu to select your desired theme for your stories.

## Get involved

Now you're ready to use Tailwind with Storybook. 🎉

If you use Tailwind at work, we'd love your help making this setup even easier. Join the maintainers in [Discord](https://discord.gg/storybook) to get involved, or jump into [addon docs](/docs/addons).
