<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you have a React app using styled-components and have just set up Storybook >=7.0 using the [getting started guide](/docs/react/get-started/install). Don’t have this? Follow styled-components' [installation instructions](https://styled-components.com/docs/basics#installation) then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</Callout>

## 1. Add `@storybook/addon-themes`

Run the following script to install and register the addon:

```bash
npx storybook@latest add @storybook/addon-themes
```

This will run a configuration script that will walk you through setting up the addon. When prompted, select `styled-components` from the configuration options.

<details>
  <summary>Did the configuration script fail?</summary>
  <p>Under the hood, this runs <code>npx @storybook/auto-config themes</code>, which should read your project and try to configure your Storybook with the correct decorator. If running that command directly does not solve your problem, please file a bug on the <a href="https://github.com/storybookjs/auto-config/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D" target="_blank">@storybook/auto-config</a> repository so that we can further improve it. To manually add this addon, install it, and then add it to the addons array in your <code>.storybook/main.ts</code>.</p>
</details>

## 2. Provide `GlobalStyles`

In `.storybook/preview.js`, create a `<GlobalStyles /`> component that includes a `font-family`. Then apply it to your stories with the [`withThemeFromJSXProvider`](https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/api.md#withthemefromjsxprovider) decorator by adding it to the `decorators` array.

```js
// .storybook/preview.jsx
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles, // Adds your GlobalStyle component to all stories
  }),
];
```

<Callout variant="neutral" icon="ℹ️">

If you already have `<GlobalStyles />` in your app, you can import it into `.storybook/preview.js` instead of creating it anew.

</Callout>


## 3. Provide your theme(s)
To share your theme(s) with the components in Storybook, you'll need to provide them to the `withThemeFromJSXProvider` decorator along with `styled-components` `<ThemeProvider />` component.

```js
// .storybook/preview.jsx
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { lightTheme, darkTheme } from '../src/themes';

/* snipped for brevity */

export const decorators = [
  withThemeFromJSXProvider({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  }
  defaultTheme: 'light',
  Provider: ThemeProvider,
  GlobalStyles,
})];
```

<Callout variant="neutral" icon="ℹ️">

When you provide more than one theme, a toolbar menu will appear in the Storybook UI to select your desired theme for your stories.

</Callout>

## Get involved

Now you're ready to use styled-components with Storybook. 🎉

If you use styled-components at work, we'd love your help making this setup even easier. Join the maintainers in [Discord](https://discord.gg/storybook) to get involved, or jump into [addon docs](/docs/addons).
