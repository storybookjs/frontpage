<div class="aside aside__no-top">

This recipe assumes that you have a React app using Emotion and have just set up Storybook >=6.0 using the [getting started guide](/docs/react/get-started/install). Don’t have this? Follow Emotion's [installation instructions](https://emotion.sh/docs/introduction#react) then run:

```shell
# Add Storybook:
npx sb init
```

</div>

<RecipeHeader>

How to setup Emotion and Storybook

</RecipeHeader>

Emotion is a popular library for building UI components with CSS-in-JS, while Storybook is a tool for creating and testing UI components in isolation.
This post will show you how to integrate these two tools to create a powerful and flexible development environment for building user interfaces with Emotion.

This post will explain how to:

1. 🔌 Setup `Global` styles
1. 🧱 Use Emotion in your components
1. 💅 Use a theme in your stories
1. 🎨 Switch betweens themes in a click

If you’d like to see the example code of this recipe, check out the [example repository](https://github.com/Integrayshaun/emotion-recipe) on GitHub. Let's get started!

![Completed Emotion example with theme switcher](https://user-images.githubusercontent.com/18172605/208312563-875ca3b0-e7bc-4401-a445-4553b48068ed.gif)

## How to setup `Global` styles

UIs often have a set of global styles that are applied to every component like CSS resets, `font-size`, `font-family`, and colors. In Emotion, use the [`Global`](https://emotion.sh/docs/globals) to scope styles globally instead of locally (which is the library's default behavior).

Open `.storybook/preview.js` and create a `Global` component which includes a `font-family`. Then apply it to all stories via a [decorator](/docs/react/writing-stories/decorators).

```js
// .storybook/preview.js

import { Global, css } from '@emotion/react';

const withGlobalStyle = (Story) => (
  <>
    <Global
      styles={css`
        body {
          font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      `}
    />
    <Story />
  </>
);

export const decorators = [withGlobalStyle];
```

<div class="aside">

If you already have `Global` in your app, you can import it into `.storybook/preview.js` instead of creating it anew.

</div>

## Using Emotion in components

Let’s update some of our example components to use Emotion instead. Open up the Button component in `./src/stories/button.js.` and replace it with the following code:

```js
// ./src/stories/button.js

import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

Now the `Button` component is made with Emotion. In Storybook, you won't notice a visual difference. But if you inspect the DOM, you'll see hashed CSS-in-JS classnames.

## Provide a theme for Emotion in Storybook

![Switching over to using a theme for emotion in storybook](https://user-images.githubusercontent.com/18172605/208312571-431a182d-fe2b-40e7-a21f-aaadf55c899e.gif)

One of the benefits of Emotion is that you can provide a theme to help you style all of your components in a consistent way. Let's create a new `./src/theme.js` and add the following light theme:

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

To share this theme with the components in Storybook, you'll need a [decorator](/docs/react/writing-stories/decorators).

Below I created a new file in `.storybook` called `withTheme.decorator.js` that will wrap your stories with Emotion's `ThemeProvider`.

```js
// .storybook/withTheme.decorator.js

import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../src/theme';

export const withTheme = (Story) => (
  <ThemeProvider theme={lightTheme}>
    <Story />
  </ThemeProvider>
);
```

All that is left to do is give this decorator to Storybook. Add the decorator to the `decorators` array in `.storybook/preview.js`:

```js
// .storybook/preview.js

import { Global, css } from '@emotion/react';
import { withTheme } from './withTheme.decorator';

const withGlobalStyle = (Story) => (
  <>
    <Global
      styles={css`
        body {
          font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      `}
    />
    <Story />
  </>
);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [withGlobalStyle, withTheme];
```

Now, components made with Emotion will get the theme through the `theme` prop along with the styles inherited from `Global`. Let's update the example components to use the theme.

<!-- prettier-ignore-start -->

<CodeSnippets
    paths={[
        '@emotion/styled/Button.js.mdx',
        '@emotion/styled/Header.js.mdx',
        '@emotion/styled/Page.js.mdx',
    ]}
/>

<!-- prettier-ignore-end -->

## Add a theme switcher tool using `globalTypes`

Dark mode has become an increasingly popular offering on the web. This can be achieved quickly using themes.

![Completed Emotion example with theme switcher](https://user-images.githubusercontent.com/18172605/208312563-875ca3b0-e7bc-4401-a445-4553b48068ed.gif)

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

![Completed Emotion example with theme switcher](https://user-images.githubusercontent.com/18172605/208312563-875ca3b0-e7bc-4401-a445-4553b48068ed.gif)

To add the switcher, declare a [global type](/docs/react/essentials/toolbars-and-globals) named `theme` in `.storybook/preview.js` and give it a list of supported themes to choose from.

```js
// .storybook/preview.js

/* snipped for brevity */

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape
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

## Update `withTheme` to change themes

The last step to switch between themes is to update the `withTheme` decorator to change the theme based on the selected value of the `theme` global variable.

```js
// .storybook/withTheme.decorator.js

import { css, Global, ThemeProvider, useTheme } from '@emotion/react';
import { lightTheme, darkTheme } from '../src/theme';

const THEMES = {
  light: lightTheme,
  dark: darkTheme,
};

// Sets the background based on theme by creating another global style definition
const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        html,
        body {
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
        }
      `}
    />
  );
};

export const withTheme = (Story, context) => {
  const { theme } = context.globals;

  return (
    <ThemeProvider theme={THEMES[theme] || THEMES['light']}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  );
};
```

## Get involved

Now you're ready to use Emotion with Storybook. 🎉 Check out the [example repo](https://github.com/Integrayshaun/emotion-recipe) for a quick start.

If you use Emotion at work, we'd love your help making an addon that automatically applies the configuration above. Join the maintainers in [Discord](https://discord.gg/storybook) to get involved, or jump into [addon docs](/docs/react/addons/introduction).
