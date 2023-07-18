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

## Install `@storybook/addon-styling`

Add the `@storybook/addon-styling` package to your DevDependencies

```shell
yarn add -D @storybook/addon-styling
```

## Auto-config

<div class="aside">

<span aria-hidden="true">📣</span> Before running this codemod, please ensure that you have no other changes in your git branch.

</div>

As of version 1.3, `@storybook/addon-styling` offers a codemod for to automatically configure your storybook with Tailwind.

To try it out, run the following script:

```shell
# Run the postinstall script from the root of your project
yarn addon-styling-setup
```

If the codemod didn't work, please let us know in [this GitHub issue](https://github.com/storybookjs/addon-styling/issues/49#issue-1746365130) so we can continue to make the codemod even better. In the meantime, the instructions below will get you up and running in no time.

## Manual

### Build Tailwind next to Storybook

To develop with Tailwind alongside your stories, storybook will need to know how to handle Tailwind's custom `@tailwind` css directive. We can do this with PostCSS.

First of all, install a few extra dependencies.

```shell
yarn add -D @storybook/addon-styling postcss autoprefixer
```

Now create a `postcss.config.js` file in the root of your project.

```js
// postcss.config.js

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Then add the `@storybook/addon-styling` to your `.storybook/main.js` file an pass it `postcss` in `options.postCss.implementation`.

```js
module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],
  // snipped for brevity
};
```

<div class="aside">

<span aria-hidden="true">📣</span> If you are using Vite, `@storybook/nextjs`, `@storybook/angular`, or `@storybook/preset-create-react-app` with `react-scripts@2.0.0`, then leave the options object empty.

</div>

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

To add the switcher, add the [`withThemeByDataAttribute`](https://github.com/storybookjs/addon-styling/blob/main/docs/api.md#withthemebydataattribute) decorator to your storybook from `@storybook/addon-styling`

```js
// .storybook/preview.js
import { withThemeByDataAttribute } from '@storybook/addon-styling';

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

Now you're ready to use Tailwind with Storybook. 🎉 Check out the [example repo](https://github.com/Integrayshaun/storybook-tailwind-recipe-example) for a quick start.

If you use Tailwind at work, we'd love your help making an addon that automatically applies the configuration above. Join the maintainers in [Discord](https://discord.gg/storybook) to get involved, or jump into [addon docs](/docs/react/addons/introduction).
