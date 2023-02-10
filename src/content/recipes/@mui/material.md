<div class="aside aside__no-top">

This recipe assumes that you already have a React app using the `@mui/material` package set up with Storybook 6.0 or newer. If you don’t have a project ready, clone my [example repository](https://github.com/ShaunLloyd/storybook-mui-example) to follow along.

</div>

<RecipeHeader>

How to setup Material UI and Storybook

</RecipeHeader>

Material UI offers a set of themeable components that devs can use to start building UIs right away. It’s based on Material Design language from Google.

Storybook is a frontend workbench for building UIs in isolation. By combining Storybook and Material UI, you can build UIs faster without all the grunt work. This recipe shows you how to configure Storybook to load Material UI components and dynamically interact with their API.

📦 Bundle your fonts for fast and consistent rendering
🎨 Load your custom theme and add a theme switcher
♻️ Reuse Material UI types to auto-generate story controls

## Bundle fonts and icons for better perf

Material UI depends on two fonts to render as intended, Google’s [`Roboto`](https://fonts.google.com/specimen/Roboto) and [`Material Icons`](https://fonts.google.com/icons?query=Christian+Robertson&icon.style=Outlined&icon.set=Material+Icons). While you can load these fonts directly from the Google Fonts CDN, bundling fonts with Storybook is better for performance.

- 🏎️ **Fonts load faster** because they are coming from the same place as your app
- ✈️ **Font will load offline** so you can continue developing your stories anywhere
- 📸 **No more inconsistent snapshot tests** because fonts load instantly

To get started, install the fonts as dependencies.

```bash
yarn add @fontsource/roboto @fontsource/material-icons
```

Then import the CSS files into `.storybook/preview.js`, the entrypoint of your storybook.

```javascript
// .storybook/preview.js

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';
```

## Load custom themes and add a theme switcher

Material UI comes with a default theme out of the box, but you can also create and provide your own themes. Given the popularity of dark mode, you'll likely end with more than one custom theme. Let's look at how you can load custom themes and switch between them with just a click.

![Switching between light and dark mode using a theme switcher in the Storybook toolbar](https://lh3.googleusercontent.com/iqsY5lIKADg0xiIxGe7a9qS40R_HP-yNi50PGqO5VuPKVTFoio98LRdM8VvIE40kENxw6nHpu9P5DqkUQNLRJDtGCg9aw-hf4hW8dCtnRdqgxjCLJHOol-04dKjN-cEi-7pBzgy-s8Z8X_ojXMLGXdy04CsttlQevGeAiu6nyGHxzb7VW9FsTnmYQw)

For example, take these custom light and dark mode themes.

```js
// src/themes.js

import { createTheme } from '@mui/material';
import { blueGrey, cyan, pink } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: cyan['A200'],
    },
    secondary: {
      main: pink['A400'],
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: pink['A200'],
    },
    secondary: {
      main: cyan['A400'],
    },
    background: {
      default: blueGrey['800'],
      paper: blueGrey['700'],
    },
  },
});
```

First of all, install our [`@storybook/addon-styling`](https://github.com/storybookjs/addon-styling) addon.

```shell
yarn add -D @storybook/addon-styling
```

Then register it with Storybook in `.storybook/main.js`

```js
module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-styling'],
};
```

And finally apply the custom themes to our stories, we’ll need to wrap them in Material UI’s `ThemeProvider` using the `withThemeFromJSXProvider` decorator.

```js
// .storybook/preview.js
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { lightTheme, darkTheme } from '../src/themes.js';

/* snipped for brevity */

export const decorators = [
  withThemeFromJSXProvider({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  }
  defaultTheme: 'light',
  Provider: ThemeProvider,
  GlobalStyles: CssBaseline,
})];
```

Awesome! Now when Storybook is reloaded, you'll see that our `withThemeFromJSXProvider` decorator is providing our custom light theme by default.

## Use Material UI prop types for better controls and docs

Storybook controls give you graphical controls to manipulate a component’s props. They’re handy for finding edge cases of a component and prototyping in the browser.

Usually, you have to manually configure controls. But if you’re using Typescript, you can reuse Material UI’s component prop types to auto generate story controls. As a bonus, this will also automatically populate the prop table in your documentation tab.

![Changing the button components props using Storybook controls](https://storybookblog.ghost.io/content/images/2022/10/2022-10-04-15.48.29.gif)

Let’s take the following Button component for example.

```jsx
// button.component.tsx

import React from 'react';
import { Button as MuiButton } from '@mui/material';

export interface ButtonProps {
  label: string;
}

export const Button = ({ label, ...rest }: ButtonProps) => <MuiButton {...rest}>{label}</MuiButton>;
```

Here I’m using the label prop as the `MuiButton`’s child and passing all other props through. However, when we render this into Storybook, our controls panel only lets us change the label prop that we declared ourselves.

![The button story with only a label prop control](https://lh5.googleusercontent.com/ytI83Pvj6fPPl_OipK-4sF3rz_XMS4x6m6uSwkAI4nJ76Pqph8FOk9mb3hRNDCoV0xXLHX4pnXXvpq5EH1ysTnmXj61tdN94fVm1yjgMP58ow0QLWWL4_ouZIJcZ4LhKxyAZ8kKDybhOiZZfyAFeA9JqJpE51GzKgnoE8J0ByTYQ5p6ViKgw3J01Aw)

This is because Storybook only adds props to the controls table that are explicitly declared in the component’s prop types or in the Story Args. Let’s update Storybook’s Docgen configuration to bring Material UI‘s Button props into the controls table as well.

```ts
// .storybook/main.ts

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // speeds up storybook build time
      allowSyntheticDefaultImports: false,
      // speeds up storybook build time
      esModuleInterop: false,
      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) =>
        prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true,
    },
  },
};
```

We also want to update the parameters in `.storybook/preview.js` to show the description and default columns for the controls table.

```js
// .storybook/preview.js

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true, // Adds the description and default columns
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
```

Lastly, update the `ButtonProps` type to extend from Material UI’s Button props to add all of these props to the controls.

```tsx
// button.component.tsx

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  label: string;
}

export const Button = ({ label, ...rest }: ButtonProps) => <MuiButton {...rest}>{label}</MuiButton>;
```

Restart your Storybook server so that these config changes take effect. You should now see that Button has controls for all of `MuiButton`'s props as well.

![The button story with all 27 prop controls from the MUI button props](https://lh3.googleusercontent.com/Km5jyCjJw_qhnmgQvlrIELxixgqwNN4FqCGbY1sjDBDI49owJg1xgwwoPBp9yRuumGzP9tlBXtOVOxqwnyLVNano2TzgV8zjXzbc7LtpE1PuaaY5GXVzRmAUP5W7t24KmNfH8HU8lB7VHpV14UTvUP9H6n1faDoJ9xfpAL4lx8-Yqgkgb9f-FKhkoQ)

### Choose which controls are visible

Our button now has **27 props**, which is perhaps a little much for your use case. To control which props are visible we can use TypeScript’s [`Pick<type, keys>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) and [`Omit<type, keys>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) utilities.

```tsx
// button.component.tsx

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

// Only include variant, size, and color
type ButtonBaseProps = Pick<MuiButtonProps, 'variant' | 'size' | 'color'>;

// Use all except disableRipple
// type ButtonBaseProps = Omit<MuiButtonProps, "disableRipple">;

export interface ButtonProps extends ButtonBaseProps {
  label: string;
}

export const Button = ({ label, ...rest }: ButtonProps) => <MuiButton {...rest}>{label}</MuiButton>;
```

And now our Button will only take the variant, size, and color props from `MuiButton`.

![The button story with only the controls specified](https://lh3.googleusercontent.com/lqYwmkGTpx1aiKkPILYcsPs5WChsgI8PLO45Dba6LXk1GeKsTJhy_5F7BWIydAOinZ9nyxOeFB9OjUE3T_lEc1jFFAPpymN4SdMa2TIe0Cu9aASmPEtO6JbGrdpzfHisTgeaeVHNVdqYzjmKZl_VxsBEBqKTsg0bMn9p-oRKqbcdu_5jOhyuBSNuYA)

📣 Shout out to [Eric Mudrak’s](https://twitter.com/ejmudrak) awesome [Storybook with React & TypeScript](https://www.erikmudrak.com/post/storybook-with-react-typescript) article that inspired this tip.
