<div class="aside aside__no-top">

This recipe assumes that you have a React app using Tailwind CSS and have just set up Storybook >=7.0 using the [getting started guide](/docs/react/get-started/install). Don’t have this? Follow Tailwind's [setup instructions](https://tailwindcss.com/docs/installation) then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</div>

<RecipeHeader>

How to setup Tailwind CSS and Storybook

</RecipeHeader>

Storybook.js is a fantastic tool for developing and showcasing UI components in isolation. One of the great things about it is that you can use any CSS framework you like, including Tailwind CSS.

In this post, we will:

1. 🏗️ Build Tailwind next to Storybook
2. 🎁 Provide Tailwind to stories
3. 🧱 Use Tailwind in your components
4. 🎨 Switch Tailwind themes in a click

![Finished example of Tailwind CSS in Storybook with a theme switcher](https://user-images.githubusercontent.com/18172605/208201389-1f448dbb-978c-442e-9d6b-7bf3fea63e64.gif)

## Before you begin

Tailwind uses PostCSS to compile your CSS. If you are using Vite, `@storybook/nextjs`, `@storybook/angular`, or `@storybook/preset-create-react-app` with `react-scripts@2.0.0`, then you can skip to the [theme switching section](#add-a-theme-switcher-tool).

## Configure PostCSS

For Webpack users, you'll need to install the [`@storybook/addon-styling-webpack`](https://storybook.js.org/addons/@storybook/addon-styling-webpack) addon.

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-styling-webpack
```

This will run a configuration script that will walk you through setting up the addon. If prompted, select `PostCSS` from the configuration options.

### Provide Tailwind to stories

Now you can import the `tailwind.css` file into your `.storybook/preview.js` file. This will make Tailwind’s style classes available to all of your stories.

```js
// .storybook/preview.js

import '../src/tailwind.css'; // replace with the name of your tailwind css file
```

## Use Tailwind in components

Let’s update some of our example components to use Tailwind instead. Open up Storybook to see what we have so far.

![Storybook before adding tailwind CSS to the example components](https://user-images.githubusercontent.com/18172605/208201413-ace25d53-880a-4580-a81a-3d628fba229e.gif)

To make use of Tailwind, replace the contents of each component file with the following code:

<!-- prettier-ignore-start -->

<CodeSnippets
    paths={[
        'tailwindcss/Button.js.mdx',
        'tailwindcss/Header.js.mdx',
        'tailwindcss/Page.js.mdx',
    ]}
/>

<!-- prettier-ignore-end -->

![Storybook after adding tailwind CSS to the example components](https://user-images.githubusercontent.com/18172605/208201423-c7ea9392-1851-4fc3-9968-6d05399c2e91.gif)

### Add a theme switcher tool

Tailwind comes out of the box with a light and dark theme. You can override those themes and add more. To get the most out of your stories, you should have a way to toggle between all of your themes.

![Finished example of Tailwind CSS in Storybook with a theme switcher](https://user-images.githubusercontent.com/18172605/208201389-1f448dbb-978c-442e-9d6b-7bf3fea63e64.gif)

First of all, update your `tailwind.config.js` file to [change themes based on a class or data-attribute](https://tailwindcss.com/docs/dark-mode#customizing-the-class-name). This example uses a data-attribute.

```js
// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Toggle dark-mode based on data-mode="dark"
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

To add the switcher, add the [`withThemeByDataAttribute`](https://github.com/storybookjs/addon-themes/blob/main/code/addons/themes/docs/api.md#withthemebydataattribute) decorator to your Storybook from `@storybook/addon-themes`

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

If you use Tailwind at work, we'd love your help making this setup even easier. Join the maintainers in [Discord](https://discord.gg/storybook) to get involved, or jump into [addon docs](/docs/react/addons/introduction).
