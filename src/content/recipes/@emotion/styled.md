<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you have a React app using Emotion and have just set up Storybook >=7.0 using the [getting started guide](/docs/react/get-started/install). Don’t have this? Follow Emotion's [installation instructions](https://emotion.sh/docs/introduction#react) then run:

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

## 2. Provide `GlobalStyles`

Inside of `.storybook/preview.js`, create a `<GlobalStyles />` component that includes a `font-family`. Then apply it to your stories with the [`withThemeFromJSXProvider` decorator](https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/api.md#withthemefromjsxprovider) by adding it to the decorators array.

```js
// .storybook/preview.jsx
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
    `}
  />
);

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles, // Adds your GlobalStyles component to all stories
  }),
];
```

<Callout variant="neutral" icon="ℹ️">

If you already have `<Global />` in your app, you can import it into `.storybook/preview.js` instead of creating it anew.

</Callout>

## 3. Provide your theme(s)

To share your theme(s) with the components in Storybook, you'll need to provide them to the `withThemeFromJSXProvider` decorator along with `@emotion/styled`'s `<ThemeProvider />` component.

```js
// .storybook/preview.jsx
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { Global, css, ThemeProvider } from '@emotion/react';

import { lightTheme, darkTheme } from '../src/themes';

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
    `}
  />
);

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

Now, components made with Emotion will get the theme through the `theme` prop along with the styles inherited from `<Global />`.

<Callout variant="neutral" icon="ℹ️">

When you provide more than one theme, a toolbar menu will appear in the Storybook UI to select your desired theme for your stories.

</Callout>

![Completed Emotion example with theme switcher](https://user-images.githubusercontent.com/18172605/208312563-875ca3b0-e7bc-4401-a445-4553b48068ed.gif)

## Get involved

Now you're ready to use Emotion with Storybook. 🎉

If you use Emotion at work, we'd love your help making this setup even better. Join the maintainers in [Discord](https://discord.gg/storybook) to get involved, or jump into [addon docs](/docs/addons).
