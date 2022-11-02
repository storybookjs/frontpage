import React from 'react';
import { RecipesDetailScreen } from './RecipesDetailScreen';

import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';

export default {
  title: 'Frontpage|screens/RecipesDetailScreen',
  component: RecipesDetailScreen,
};

const muiRecipe = {
  icon: 'https://raw.githubusercontent.com/react-theming/storybook-addon-material-ui/master/docs/logos/material-ui.png',
  displayName: 'Material UI',
  name: '@mui/material',
  description:
    "Material UI is component library styled based on Google's Material Design spec. This recipe shows you how to get the most out of Material UI in Storybook.",
  authors: [
    {
      id: '0',
      name: 'Shaun Lloyd',
      avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
    },
  ],
  readme:
    "<p>This recipe assumes that you already have a React app using the <code>@mui/material</code> package set up with Storybook 6.0 or newer. If you don’t have a project ready, clone my <a href=\"https://github.com/ShaunLloyd/storybook-mui-example\">example repository</a> to follow along.</p>\n<h2>Bundle fonts and icons for better perf</h2>\n<p>Material UI depends on two fonts to render as intended, Google’s <a href=\"https://fonts.google.com/specimen/Roboto\"><code>Roboto</code></a> and <a href=\"https://fonts.google.com/icons?query=Christian+Robertson&#x26;icon.style=Outlined&#x26;icon.set=Material+Icons\"><code>Material Icons</code></a>. While you can load these fonts directly from the Google Fonts CDN, bundling fonts with Storybook is better for performance.</p>\n<ul>\n<li>🏎️ <strong>Fonts load faster</strong> because they are coming from the same place as your app</li>\n<li>✈️ <strong>Font will load offline</strong> so you can continue developing your stories anywhere</li>\n<li>📸 <strong>No more inconsistent snapshot tests</strong> because fonts load instantly</li>\n</ul>\n<p>To get started, install the fonts as dependencies.</p>\n<pre><code class=\"language-bash\">yarn add @fontsource/roboto @fontsource/material-icons\n</code></pre>\n<p>Then import the CSS files into <code>.storybook/preview.js</code>, the entrypoint of your storybook.</p>\n<pre><code class=\"language-javascript\">// .storybook/preview.js\n\nimport '@fontsource/roboto/300.css';\nimport '@fontsource/roboto/400.css';\nimport '@fontsource/roboto/500.css';\nimport '@fontsource/roboto/700.css';\nimport '@fontsource/material-icons';\n</code></pre>\n<h2>Load custom themes and add a theme switcher</h2>\n<p>Material UI comes with a default theme out of the box, but you can also create and provide your own themes. Given the popularity of dark mode, you'll likely end with more than one custom theme. Let's look at how you can load custom themes and switch between them with just a click.</p>\n<p><img src=\"https://lh3.googleusercontent.com/O5NeQidj2tK5hbgw6oT_25HZLm4VUkpUgLUcIsFEahslc0Y8mweYVR6gAflPidqEwTUWedVXC_Xt58OEqbzJc4xWvFnjWyQmWCGbcLSa_RWK41G5_iZ8-LvkWcemfg5TV6tF_VFXj6GHNFIK92z_WvEKspVDBUqX6a1EirtwMIprFhPY8sHDudwpWQ\" alt=\"Storybook changing to the provided dark theme\"></p>\n<p>For example, take this custom dark mode theme.</p>\n<pre><code class=\"language-jsx\">// src/themes/dark.theme.js\n\nimport { createTheme } from '@mui/material';\nimport { blueGrey, cyan, pink } from '@mui/material/colors';\n\nexport const darkTheme = createTheme({\n  palette: {\n    mode: 'dark',\n    primary: {\n      main: pink['A200'],\n    },\n    secondary: {\n      main: cyan['A400'],\n    },\n    background: {\n      default: blueGrey['800'],\n      paper: blueGrey['700'],\n    },\n  },\n});\n</code></pre>\n<p>To apply the custom theme to our stories, we’ll need to wrap them in Material UI’s <code>ThemeProvider</code> using a decorator.</p>\n<pre><code class=\"language-jsx\">// .storybook/preview.js\n\nimport { CssBaseline, ThemeProvider } from '@mui/material';\nimport { darkTheme } from '../src/themes/dark.theme';\n\n/* snipped for brevity */\n\nexport const withMuiTheme = (Story) => (\n  &#x3C;ThemeProvider theme={darkTheme}>\n    &#x3C;CssBaseline />\n    &#x3C;Story />\n  &#x3C;/ThemeProvider>\n);\n\nexport const decorators = [withMuiTheme];\n</code></pre>\n<p>Awesome! Now when Storybook is reloaded, you'll see that our <code>withMuiTheme</code> decorator is providing our custom dark theme.</p>\n<h3>Use globalTypes to add a theme switcher</h3>\n<p>To take this decorator a step further, let’s add a way to toggle between multiple themes.</p>\n<p><img src=\"https://lh3.googleusercontent.com/iqsY5lIKADg0xiIxGe7a9qS40R_HP-yNi50PGqO5VuPKVTFoio98LRdM8VvIE40kENxw6nHpu9P5DqkUQNLRJDtGCg9aw-hf4hW8dCtnRdqgxjCLJHOol-04dKjN-cEi-7pBzgy-s8Z8X_ojXMLGXdy04CsttlQevGeAiu6nyGHxzb7VW9FsTnmYQw\" alt=\"Switching between light and dark mode using a theme switcher in the Storybook toolbar\"></p>\n<p>To do this, we can declare a global variable named theme in <code>.storybook/preview.js</code> and give it a list of supported themes to choose from.</p>\n<pre><code class=\"language-jsx\">// .storybook/preview.js\n\nexport const globalTypes = {\n  theme: {\n    name: 'Theme',\n    title: 'Theme',\n    description: 'Theme for your components',\n    defaultValue: 'light',\n    toolbar: {\n      icon: 'paintbrush',\n      dynamicTitle: true,\n      items: [\n        { value: 'light', left: '☀️', title: 'Light mode' },\n        { value: 'dark', left: '🌙', title: 'Dark mode' },\n      ],\n    },\n  },\n};\n</code></pre>\n<p>Now we can update our decorator to provide the theme selected in our new dropdown.</p>\n<pre><code class=\"language-jsx\">// .storybook/preview.js\n\nimport { useMemo } from 'react';\n\n/* Snipped for brevity */\n\n// Add your theme configurations to an object that you can\n// pull your desired theme from.\nconst THEMES = {\n  light: lightTheme,\n  dark: darkTheme,\n};\n\nexport const withMuiTheme = (Story, context) => {\n  // The theme global we just declared\n  const { theme: themeKey } = context.globals;\n\n  // only recompute the theme if the themeKey changes\n  const theme = useMemo(() => THEMES[themeKey] || THEMES['light'], [themeKey]);\n\n  return (\n    &#x3C;ThemeProvider theme={theme}>\n      &#x3C;CssBaseline />\n      &#x3C;Story />\n    &#x3C;/ThemeProvider>\n  );\n};\n</code></pre>\n<p>Now we have a fully functioning theme switcher for our MaterialUI Storybook. If you want to learn more about switchers, check out <strong>Yann Braga’s</strong> article on <a href=\"https://storybook.js.org/blog/how-to-add-a-theme-switcher-to-storybook/\">adding a theme switcher</a>.</p>\n<h2>Use Material UI prop types for better controls and docs</h2>\n<p>Storybook controls give you graphical controls to manipulate a component’s props. They’re handy for finding edge cases of a component and prototyping in the browser.</p>\n<p>Usually, you have to manually configure controls. But if you’re using Typescript, you can reuse Material UI’s component prop types to auto generate story controls. As a bonus, this will also automatically populate the prop table in your documentation tab.</p>\n<p><img src=\"https://storybookblog.ghost.io/content/images/2022/10/2022-10-04-15.48.29.gif\" alt=\"Changing the button components props using Storybook controls\"></p>\n<p>Let’s take the following Button component for example.</p>\n<pre><code class=\"language-jsx\">// button.component.tsx\n\nimport React from 'react';\nimport { Button as MuiButton } from '@mui/material';\n\nexport interface ButtonProps {\n  label: string;\n}\n\nexport const Button = ({ label, ...rest }: ButtonProps) => &#x3C;MuiButton {...rest}>{label}&#x3C;/MuiButton>;\n</code></pre>\n<p>Here I’m using the label prop as the <code>MuiButton</code>’s child and passing all other props through. However, when we render this into Storybook, our controls panel only lets us change the label prop that we declared ourselves.</p>\n<p><img src=\"https://lh5.googleusercontent.com/ytI83Pvj6fPPl_OipK-4sF3rz_XMS4x6m6uSwkAI4nJ76Pqph8FOk9mb3hRNDCoV0xXLHX4pnXXvpq5EH1ysTnmXj61tdN94fVm1yjgMP58ow0QLWWL4_ouZIJcZ4LhKxyAZ8kKDybhOiZZfyAFeA9JqJpE51GzKgnoE8J0ByTYQ5p6ViKgw3J01Aw\" alt=\"The button story with only a label prop control\"></p>\n<p>This is because Storybook only adds props to the controls table that are explicitly declared in the component’s prop types or in the Story Args. Let’s update Storybook’s Docgen configuration to bring Material UI‘s Button props into the controls table as well.</p>\n<pre><code class=\"language-ts\">// .storybook/main.ts\n\nmodule.exports = {\n  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],\n  addons: [\n    '@storybook/addon-links',\n    '@storybook/addon-essentials',\n    '@storybook/addon-interactions',\n    '@storybook/preset-create-react-app',\n  ],\n  framework: '@storybook/react',\n  core: {\n    builder: '@storybook/builder-webpack5',\n  },\n  typescript: {\n    check: false,\n    checkOptions: {},\n    reactDocgen: 'react-docgen-typescript',\n    reactDocgenTypescriptOptions: {\n      // speeds up storybook build time\n      allowSyntheticDefaultImports: false,\n      // speeds up storybook build time\n      esModuleInterop: false,\n      // makes union prop types like variant and size appear as select controls\n      shouldExtractLiteralValuesFromEnum: true,\n      // makes string and boolean types that can be undefined appear as inputs and switches\n      shouldRemoveUndefinedFromOptional: true,\n      // Filter out third-party props from node_modules except @mui packages\n      propFilter: (prop) =>\n        prop.parent ? !/node_modules\\/(?!@mui)/.test(prop.parent.fileName) : true,\n    },\n  },\n};\n</code></pre>\n<p>We also want to update the parameters in <code>.storybook/preview.js</code> to show the description and default columns for the controls table.</p>\n<pre><code class=\"language-js\">// .storybook/preview.js\n\nexport const parameters = {\n  actions: { argTypesRegex: '^on[A-Z].*' },\n  controls: {\n    expanded: true, // Adds the description and default columns\n    matchers: {\n      color: /(background|color)$/i,\n      date: /Date$/,\n    },\n  },\n};\n</code></pre>\n<p>Lastly, update the <code>ButtonProps</code> type to extend from Material UI’s Button props to add all of these props to the controls.</p>\n<pre><code class=\"language-tsx\">// button.component.tsx\n\nimport React from 'react';\nimport { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';\n\nexport interface ButtonProps extends MuiButtonProps {\n  label: string;\n}\n\nexport const Button = ({ label, ...rest }: ButtonProps) => &#x3C;MuiButton {...rest}>{label}&#x3C;/MuiButton>;\n</code></pre>\n<p>Restart your Storybook server so that these config changes take effect. You should now see that Button has controls for all of <code>MuiButton</code>'s props as well.</p>\n<p><img src=\"https://lh3.googleusercontent.com/Km5jyCjJw_qhnmgQvlrIELxixgqwNN4FqCGbY1sjDBDI49owJg1xgwwoPBp9yRuumGzP9tlBXtOVOxqwnyLVNano2TzgV8zjXzbc7LtpE1PuaaY5GXVzRmAUP5W7t24KmNfH8HU8lB7VHpV14UTvUP9H6n1faDoJ9xfpAL4lx8-Yqgkgb9f-FKhkoQ\" alt=\"The button story with all 27 prop controls from the MUI button props\"></p>\n<h3>Choose which controls are visible</h3>\n<p>Our button now has <strong>27 props</strong>, which is perhaps a little much for your use case. To control which props are visible we can use TypeScript’s <a href=\"https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys\"><code>Pick&#x3C;type, keys></code></a> and <a href=\"https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys\"><code>Omit&#x3C;type, keys></code></a> utilities.</p>\n<pre><code class=\"language-tsx\">// button.component.tsx\n\nimport React from 'react';\nimport { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';\n\n// Only include variant, size, and color\ntype ButtonBaseProps = Pick&#x3C;MuiButtonProps, 'variant' | 'size' | 'color'>;\n\n// Use all except disableRipple\n// type ButtonBaseProps = Omit&#x3C;MuiButtonProps, \"disableRipple\">;\n\nexport interface ButtonProps extends ButtonBaseProps {\n  label: string;\n}\n\nexport const Button = ({ label, ...rest }: ButtonProps) => &#x3C;MuiButton {...rest}>{label}&#x3C;/MuiButton>;\n</code></pre>\n<p>And now our Button will only take the variant, size, and color props from <code>MuiButton</code>.</p>\n<p><img src=\"https://lh3.googleusercontent.com/lqYwmkGTpx1aiKkPILYcsPs5WChsgI8PLO45Dba6LXk1GeKsTJhy_5F7BWIydAOinZ9nyxOeFB9OjUE3T_lEc1jFFAPpymN4SdMa2TIe0Cu9aASmPEtO6JbGrdpzfHisTgeaeVHNVdqYzjmKZl_VxsBEBqKTsg0bMn9p-oRKqbcdu_5jOhyuBSNuYA\" alt=\"The button story with only the controls specified\"></p>\n<p>📣 Shout out to <a href=\"https://twitter.com/ejmudrak\">Eric Mudrak’s</a> awesome <a href=\"https://www.erikmudrak.com/post/storybook-with-react-typescript\">Storybook with React &#x26; TypeScript</a> article that inspired this tip.</p>\n",
};

const extraAuthors = [
  {
    id: '0',
    name: 'Shaun Lloyd',
    avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
  },
  {
    id: '1',
    name: 'Dominic Nguyen',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/263385',
  },
  {
    id: '2',
    name: 'Tom Coleman',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
  },
  {
    id: '3',
    name: 'Zoltan Olah',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
  },
  {
    id: '4',
    name: 'Tim Hingston',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
  },
];

const tags = [
  {
    link: '/notes',
    name: '🗒 Notes',
  },
  {
    link: '/qa',
    name: '🕵️‍♀️ QA',
  },
  {
    link: '/prototype',
    name: '✨ Prototype',
  },
  {
    link: '/testing',
    name: '✅ Testing',
  },
];

const Template = ({ recipe, ...args }) => (
  <RecipesDetailScreen
    pageContext={{
      name: 'storybook-mobile',
      displayName: 'Mobile UX lint',
      description: 'Interact with component inputs dynamically in the Storybook UI',
      weeklyViews: 17143,
      publishedAt: 1604552400000,
      tags,
      ...recipe,
    }}
    location={{}}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  recipe: muiRecipe,
};

export const MoreThanFiveAuthors = Template.bind({});
MoreThanFiveAuthors.args = {
  recipe: {
    ...muiRecipe,
    authors: [...muiRecipe.authors, ...extraAuthors],
  },
};

export const HasAddons = Template.bind({});
HasAddons.args = {
  recipe: {
    ...muiRecipe,
    addons: addonItemsData.slice(0, 3),
  },
};

export const WithFromBreadcrumb = Template.bind({});
WithFromBreadcrumb.args = {
  recipe: muiRecipe,
  location: {
    state: {
      from: {
        link: '/addons/data-state',
        title: 'Data & State',
      },
    },
  },
};
