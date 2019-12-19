import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { ensure, themes } from '@storybook/theming';

import { global } from '@storybook/design-system';

const theme = ensure(themes.light);
const { GlobalStyle } = global;

export const Global = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
