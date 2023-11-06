<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you already have a React app using `@mui/material` and have just set up **Storybook >= 7.0** using the [getting started guide](/docs/react/get-started/install). Don't have this? Follow MUI's [setup instructions](https://mui.com/material-ui/getting-started/installation/) then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</Callout>

## 1. Add `@storybook/addon-themes`

To get started, you'll need to install [`@storybook/addon-themes`](https://storybook.js.org/addons/@storybook/addon-themes).

Run the following script to install and register the addon:

```bash
npx storybook@latest add @storybook/addon-themes
```

<details>
  <summary>Did the configuration script fail?</summary>
  <p>Under the hood, this runs <code>npx @storybook/auto-config themes</code>, which should read your project and try to configure your Storybook with the correct decorator. If running that command directly does not solve your problem, please file a bug on the <a href="https://github.com/storybookjs/auto-config/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D" target="_blank">@storybook/auto-config</a> repository so that we can further improve it. To manually add this addon, install it, and then add it to the addons array in your <code>.storybook/main.ts</code>.</p>
</details>

### 2. Bundle fonts and icons for better perf

Material UI depends on two fonts to render as intended, Google’s [`Roboto`](https://fonts.google.com/specimen/Roboto) and [`Material Icons`](https://fonts.google.com/icons?query=Christian+Robertson&icon.style=Outlined&icon.set=Material+Icons). While you can load these fonts directly from the Google Fonts CDN, bundling fonts with Storybook is better for performance.

- 🏎️ **Fonts load faster** because they are coming from the same place as your app
- ✈️ **Font will load offline** so you can continue developing your stories anywhere
- 📸 **No more inconsistent snapshot tests** because fonts load instantly

To get started, install the fonts as dependencies.

```bash
yarn add @fontsource/roboto @fontsource/material-icons
```

Then import the CSS files into `.storybook/preview.js`, the entry point of your Storybook.

```javascript
// .storybook/preview.js

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';
```

### 3. Load your theme(s) and global CSS

Inside of `.storybook/preview.js`, import `<CssBaseline />`, `<ThemeProvider />`, and your theme(s), then apply them to your stories with the [`withThemeFromJSXProvider`](https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/api.md#withthemefromjsxprovider) decorator by adding it to the `decorators` array.


```js
// .storybook/preview.js
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { lightTheme, darkTheme } from '../src/themes.js';

/* snipped for brevity */

export const decorators = [
  withThemeFromJSXProvider({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  defaultTheme: 'light',
  Provider: ThemeProvider,
  GlobalStyles: CssBaseline,
})];
```

<Callout variant="neutral" icon="ℹ️">

When you provide more than one theme, a toolbar menu will appear in the Storybook UI to select your desired theme for your stories.

</Callout>


## 4. Use Material UI prop types for better controls and docs

Storybook controls give you graphical controls to manipulate a component’s props. They’re handy for finding edge cases of a component and prototyping in the browser.

Usually, you have to manually configure controls. But if you’re using Typescript, you can reuse Material UI’s component prop types to auto-generate story controls. As a bonus, this will also automatically populate the prop table in your documentation tab.

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
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-styling'],
  framework: '@storybook/your-framework',
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // Makes string and boolean types that can be undefined appear as inputs and switches
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
