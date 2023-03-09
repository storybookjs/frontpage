<div class="aside aside__no-top">

This recipe assumes that you have a React app using styled-components and have just set up Storybook >=6.0 using the [getting started guide](/docs/react/get-started/install). Don’t have this? Follow styled-components' [installation instructions](https://styled-components.com/docs/basics#installation) then run:

```shell
# Add Storybook:
npx sb init
```

</div>

<RecipeHeader>

How to setup styled-components and Storybook

</RecipeHeader>

styled-components is a popular library for building UI components with CSS-in-JS, while Storybook is a tool for creating and testing UI components in isolation. This post will show you how to integrate these two tools to create a powerful and flexible development environment for building user interfaces with styled-components.

This post will explain how to:

1. 🔌 Setup `GlobalStyles`
2. 🧱 Use styled-components in your components
3. 💅 Use a theme in your stories
4. 🎨 Switch betweens themes in a click

If you’d like to see the example code of this recipe, check out the [example repository](https://github.com/Integrayshaun/styled-components-recipe) on GitHub. Let's get started!

![Completed styled-components example with theme switcher](https://user-images.githubusercontent.com/18172605/208312563-875ca3b0-e7bc-4401-a445-4553b48068ed.gif)

## Install `@storybook/addon-styling`

Add the `@storybook/addon-styling` package to your DevDependencies

```shell
yarn add -D @storybook/addon-styling
```

Then register with Storybook in `.storybook/main.js`.

```js
module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-styling'],
};
```

## How to setup `GlobalStyles`

UIs often have a set of global styles that are applied to every component like CSS resets, `font-size`, `font-family`, and colors.

In styled-components, use the [`createGlobalStyle`](https://styled-components.com/docs/api#createglobalstyle) API to scope styles globally instead of locally (which is the library's default behavior).

Open `.storybook/preview.js` and create a `GlobalStyles` component which includes a `font-family`. Then apply it to your stories with the [`withThemeFromJSXProvider`](https://github.com/storybookjs/addon-styling/blob/main/docs/api.md#withthemefromjsxprovider) decorator by adding it to the `decorators` array.

```js
// .storybook/preview.js
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
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

<div class="aside">

If you already have `GlobalStyles` in your app, you can import it into `.storybook/preview.js` instead of creating it anew.

</div>

## Use styled-components in components

Let’s update some of our example components to use styled-components instead. Open up the Button component in `./src/stories/button.js.` and replace it with the following code:

```js
// ./src/stories/button.js

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const getVariantStyles = ({ primary = false }) =>
  primary
    ? css`
        color: white;
        background-color: #1ea7fd;
      `
    : css`
        color: #333;
        background-color: transparent;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
      `;

const getSizeStyles = ({ size = 'medium' }) => {
  switch (size) {
    case 'small': {
      return css`
        font-size: 12px;
        padding: 10px 16px;
      `;
    }
    case 'large': {
      return css`
        font-size: 16px;
        padding: 12px 24px;
      `;
    }
    default: {
      return css`
        font-size: 14px;
        padding: 11px 20px;
      `;
    }
  }
};

/**
 * Primary UI component for user interaction
 */
const StyledButton = styled.button`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  ${(props) => getVariantStyles(props)}
  ${(props) => getSizeStyles(props)}
  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `}
`;

export const Button = ({ label, ...rest }) => <StyledButton {...rest}>{label}</StyledButton>;

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
```

Now the `Button` component is made with styled-components. In Storybook, you won't notice a visual difference. But if you inspect the DOM, you'll see hashed CSS-in-JS classnames.

## Provide a theme for styled-components in Storybook

![Switching over to using a theme for styled-components in storybook](https://user-images.githubusercontent.com/18172605/208312571-431a182d-fe2b-40e7-a21f-aaadf55c899e.gif)

One of the benefits of styled-components is that you can provide a theme to help you style all of your components in a consistent way. Let's create a new `./src/theme.js` and add the following light theme:

```js
// ./src/theme.js

export const lightTheme = {
  colors: {
    background: '#F6F9FC',
    backgroundInverse: '#7A8997',
    positive: '#E1FFD4',
    negative: '#FEDED2',
    primary: '#FF4785',
    secondary: '#1EA7FD',
    tertiary: '#DDDDDD',
    text: '#222222',
  },
  spacing: {
    padding: {
      small: 10,
      medium: 20,
      large: 30,
    },
    borderRadius: {
      small: 5,
      default: 10,
    },
  },
  typography: {
    type: {
      primary: '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      code: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    },
    weight: {
      regular: '400',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    size: {
      s1: 12,
      s2: 14,
      s3: 16,
      m1: 20,
      m2: 24,
      m3: 28,
      l1: 32,
      l2: 40,
      l3: 48,
    },
  },
};
```

To share this theme with the components in Storybook, you'll need to provide it to the `withThemeFromJSXProvider` decorator along with `styled-components` ThemeProvider component.

```js
// .storybook/preview.js
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { lightTheme } from '../src/themes';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;

export const decorators = [
  withThemeFromJSXProvider({
  themes: {
    light: lightTheme,
  }
  defaultTheme: 'light',
  Provider: ThemeProvider,
  GlobalStyles,
})];
```

Now, components made with styled-components will get the theme through the `theme` prop along with the styles inherited from `GlobalStyles`. Let's update the example components to use the theme.

<!-- prettier-ignore-start -->

<CodeSnippets
    paths={[
        'styled-components/Button.js.mdx',
        'styled-components/Header.js.mdx',
        'styled-components/Page.js.mdx',
    ]}
/>

<!-- prettier-ignore-end -->

## Add a theme switcher tool using `@storybook/addon-styling`

Dark mode has become an increasingly popular offering on the web. This can be achieved quickly using themes.

![Completed styled-components example with theme switcher](https://user-images.githubusercontent.com/18172605/208312563-875ca3b0-e7bc-4401-a445-4553b48068ed.gif)

Let's add the following dark theme to `theme.js`

```js
// ./src/theme.js

/* snipped for brevity */

export const darkTheme = {
  ...lightTheme,
  colors: {
    background: '#1b1c1d',
    backgroundInverse: '#333333',
    positive: '#9fd986',
    negative: '#df987d',
    primary: '#d43369',
    secondary: '#1b8bd0',
    tertiary: '#DDDDDD',
    text: '#FFFFFF',
  },
};
```

Now, to get the most out of your stories, there should be a way to toggle between themes in a click.

![Completed styled-components example with theme switcher](https://user-images.githubusercontent.com/18172605/208312563-875ca3b0-e7bc-4401-a445-4553b48068ed.gif)

To add the switcher, add your `darkTheme` object into the the `withThemeFromJSXProvider` decorator themes object

```js
// .storybook/preview.js
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';

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

Adding a second theme will create a new toolbar menu to select your desired theme for your stories.

## Get involved

Now you're ready to use styled-components with Storybook. 🎉 Check out the [example repo](https://github.com/Integrayshaun/styled-components-recipe) for a quick start.

If you use styled-components at work, we'd love your help making an addon that automatically applies the configuration above. Join the maintainers in [Discord](https://discord.gg/storybook) to get involved, or jump into [addon docs](/docs/react/addons/introduction).
