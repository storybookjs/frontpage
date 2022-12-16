<div class="aside aside__no-top">

This recipe assumes that you have a React app using Tailwindcss and have just set up Storybook >=6.0 using the [getting started guide](/docs/react/get-started/install). Don’t have this? Follow Tailwind's [setup instructions](https://tailwindcss.com/docs/installation) then run:

```shell
# Add Storybook:
npx sb@next init
```

</div>

<RecipeHeader>

How to setup Tailwind CSS and Storybook

</RecipeHeader>

Storybook.js is a fantastic tool for developing and showcasing UI components in isolation. One of the great things about it is that you can use any CSS framework you like, including tailwind CSS.

In this post, we'll go over:

🏗️ Build Tailwind next to Storybook
🎁 Provide Tailwind to stories
🧱 Use Tailwind in your components
🎨 Switch Tailwind themes in a click

![Finished example of Tailwind CSS in Storybook with a theme switcher](https://user-images.githubusercontent.com/18172605/208201389-1f448dbb-978c-442e-9d6b-7bf3fea63e64.gif)

## Build Tailwind next to Storybook

To develop your tailwind alongside your stories, you’ll need a development environment that runs two independent but coordinated processes using `concurrently`

```shell
# install concurrently:
yarn add --dev concurrently
```

Then add these updated scripts to your `package.json`

```json
"scripts": {
   "//": "New scripts to run and build Storybook with Tailwind",
   "storybook": "concurrently \"yarn:watch:*\"",
   "build-storybook": "concurrently \"yarn:build:*\"",
   "build:css": "npx tailwindcss -i ./src/tailwind.css -o ./public/tailwind.css",
   "build:storybook": "storybook build",
   "watch:css": "npx tailwindcss -i ./src/tailwind.css -o ./public/tailwind.css --watch",
   "watch:storybook": "storybook dev -p 6006"
 },
```

## Import the tailwind.css file into Storybook

Now you can import the tailwind.css file into your .storybook/preview-head.html file. This will make Tailwind’s style classes available to all of your stories.

```html
<!-- ./storybook/preview-head.html -->
<link href="/tailwind.css" rel="stylesheet" />
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

## Add a theme switcher tool using `globalTypes`

Tailwind comes out of the box with a light and dark theme that you can override them and add more. To get the most out of your stories, you should have a way to toggle between all of your themes.

![Finished example of Tailwind CSS in Storybook with a theme switcher](https://user-images.githubusercontent.com/18172605/208201389-1f448dbb-978c-442e-9d6b-7bf3fea63e64.gif)

First of all, update your `tailwind.config.js` file to get change themes based on a class or data-attribute.

```js
// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Toggle dark-mode based on class or data-mode=”dark”
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

To add the switcher, declare a global variable named theme in `.storybook/preview.js` and give it a list of supported themes to choose from.

```js
// .storybook/preview.js
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { value: 'light', title: 'Light', left: '🌞' },
        { value: 'dark', title: 'Dark', left: '🌛' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};
```

This code will create a new toolbar menu to select your desired theme for your stories.

### Add a `withTailwindTheme` decorator

There needs to be a way to tell Tailwind to use the theme that is selected in the toolbar. To do that, This can be done using a [decorator](/docs/vue/writing-stories/decorators).

Below I created a new file in `.storybook` called `withTailwindTheme.decorator.js` that will take the global theme value and update the current theme.

```js
// .storybook/withTailwindTheme.decorator.js

import { useEffect } from 'react';

export const DEFAULT_THEME = 'light';

export const withTailwindTheme = (Story, context) => {
  const { theme } = context.globals;

  useEffect(() => {
    const htmlTag = document.documentElement;

    // Set the "data-mode" attribute on the iFrame html tag
    htmlTag.setAttribute('data-mode', theme || DEFAULT_THEME);
  }, [theme]);

  return <Story />;
};
```

Now all we have to do is give this decorator to Storybook to wrap our stories in. Add the decorator to the decorator array in .storybook/preview.js:

```js
import { DEFAULT_THEME, withTailwindTheme } from './withTailwindTheme.decorator';

/* snipped for brevity */

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: DEFAULT_THEME,
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { value: 'light', title: 'Light', left: '🌞' },
        { value: 'dark', title: 'Dark', left: '🌛' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const decorators = [withTailwindTheme];
```

## Get involved

Now you're ready to use Tailwind with Storybook. 🎉 Check out the [example repo]() for a quick start.

If you use Tailwind at work, we'd love your help making an addon that automatically applies the configuration above. Join the maintainers in Discord to get involved, or jump into addon docs.
