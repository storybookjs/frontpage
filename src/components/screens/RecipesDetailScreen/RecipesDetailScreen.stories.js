import React from 'react';
import { RecipesDetailScreen } from './RecipesDetailScreen';
import MuiSVG from '../../../images/integrations/mui.svg';

export default {
  title: 'Frontpage|screens/RecipesDetailScreen',
  component: RecipesDetailScreen,
};

const readme = `<h2 id="recipe-section">How to use Material UI with Storybook</h2><p>This recipe assumes that you already have a React app using the <code>@mui/material</code> package set up with Storybook 6.0 or newer. If you don’t have a project ready, clone our <a href="https://github.com/ShaunLloyd/storybook-mui-example"> example repository</a> to follow along.</p><h2 id="bundle-fonts-and-icons-for-better-perf">Bundle fonts and icons for better perf</h2><p>Material UI depends on two fonts to render as intended, Google’s <a href="https://fonts.google.com/specimen/Roboto"><code>Roboto</code></a> and <a href="https://fonts.google.com/icons?query=Christian+Robertson&amp;icon.style=Outlined&amp;icon.set=Material+Icons"><code>Material Icons</code></a>. While you can load these fonts directly from the Google Fonts CDN, bundling fonts with Storybook is better for performance.</p><ul><li>🏎️  <strong>Fonts load faster</strong> because they are coming from the same place as your app</li><li>✈️  <strong>Font will load offline</strong> so you can continue developing your stories anywhere</li><li>📸  <strong>No more inconsistent snapshot tests</strong> because fonts load instantly</li></ul><p>To get started, install the fonts as dependencies.</p><pre><code class="language-bash">yarn add @fontsource/roboto @fontsource/material-icons</code></pre><p>Then import the CSS files into <code>.storybook/preview.js</code>, the entrypoint of your storybook.</p><pre><code class="language-JavaScript">// .storybook/preview.js
 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';</code></pre><h2 id="load-custom-themes-and-add-a-theme-switcher">Load custom themes and add a theme switcher</h2><p>Material UI comes with a default theme out of the box, but you can also create and provide your own themes. Given the popularity of dark mode, you'll likely end with more than one custom theme. Let's look at how you can load custom themes and switch between them with just a click.</p><figure class="kg-card kg-image-card"><img src="https://lh3.googleusercontent.com/O5NeQidj2tK5hbgw6oT_25HZLm4VUkpUgLUcIsFEahslc0Y8mweYVR6gAflPidqEwTUWedVXC_Xt58OEqbzJc4xWvFnjWyQmWCGbcLSa_RWK41G5_iZ8-LvkWcemfg5TV6tF_VFXj6GHNFIK92z_WvEKspVDBUqX6a1EirtwMIprFhPY8sHDudwpWQ" class="kg-image" alt="Storybook changing to the provided dark theme" loading="lazy" width="659" height="583"></figure><p>For example, take this custom dark mode theme.</p><pre><code class="language-jsx">// src/themes/dark.theme.js

import { createTheme } from "@mui/material";
import { blueGrey, cyan, pink } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: pink["A200"],
    },
    secondary: {
      main: cyan["A400"],
    },
    background: {
      default: blueGrey["800"],
      paper: blueGrey["700"],
    },
  },
});</code></pre><p>To apply the custom theme to our stories, we’ll need to wrap them in Material UI’s <code>ThemeProvider</code> using a decorator.</p><pre><code class="language-jsx">// .storybook/preview.js

import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../src/themes/dark.theme";

/* snipped for brevity */

export const withMuiTheme = (Story) =&gt; (
  &lt;ThemeProvider theme={darkTheme}&gt;
    &lt;CssBaseline /&gt;
    &lt;Story /&gt;
  &lt;/ThemeProvider&gt;
);

export const decorators = [withMuiTheme];</code></pre><p>Awesome! Now when Storybook is reloaded, you'll see that our <code>withMuiTheme</code> decorator is providing our custom dark theme.</p><h3 id="use-globaltypes-to-add-a-theme-switcher">Use globalTypes to add a theme switcher</h3><p>To take this decorator a step further, let’s add a way to toggle between multiple themes.</p><figure class="kg-card kg-image-card"><img src="https://lh3.googleusercontent.com/iqsY5lIKADg0xiIxGe7a9qS40R_HP-yNi50PGqO5VuPKVTFoio98LRdM8VvIE40kENxw6nHpu9P5DqkUQNLRJDtGCg9aw-hf4hW8dCtnRdqgxjCLJHOol-04dKjN-cEi-7pBzgy-s8Z8X_ojXMLGXdy04CsttlQevGeAiu6nyGHxzb7VW9FsTnmYQw" class="kg-image" alt="Switching between light and dark mode using a theme switcher in the Storybook toolbar" loading="lazy" width="691" height="609"></figure><p>To do this, we can declare a global variable named theme in <code>.storybook/preview.js</code> and give it a list of supported themes to choose from.</p><pre><code class="language-jsx">// .storybook/preview.js

export const globalTypes = {
  theme: {
    name: "Theme",
    title: "Theme",
    description: "Theme for your components",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      dynamicTitle: true,
      items: [
        { value: "light", left: "☀️", title: "Light mode" },
        { value: "dark", left: "🌙", title: "Dark mode" },
      ],
    },
  },
};</code></pre><p>Now we can update our decorator to provide the theme selected in our new dropdown.<br></p><pre><code class="language-jsx">// .storybook/preview.js

import { useMemo } from "react";

/* Snipped for brevity */

// Add your theme configurations to an object that you can
// pull your desired theme from.
const THEMES = {
  light: lightTheme,
  dark: darkTheme,
};

export const withMuiTheme = (Story, context) =&gt; {
  // The theme global we just declared
  const { theme: themeKey } = context.globals;

  // only recompute the theme if the themeKey changes
  const theme = useMemo(() =&gt; THEMES[themeKey] || THEMES["light"], [themeKey]);

  return (
    &lt;ThemeProvider theme={theme}&gt;
      &lt;CssBaseline /&gt;
      &lt;Story /&gt;
    &lt;/ThemeProvider&gt;
  );
};</code></pre><p><br>Now we have a fully functioning theme switcher for our MaterialUI Storybook. If you want to learn more about switchers, check out <strong>Yann Braga’s</strong> article on <a href="https://storybook.js.org/blog/how-to-add-a-theme-switcher-to-storybook/">adding a theme switcher</a>.</p><h2 id="use-material-ui-prop-types-for-better-controls-and-docs">Use Material UI prop types for better controls and docs</h2><p>Storybook controls give you graphical controls to manipulate a component’s props. They’re handy for finding edge cases of a component and prototyping in the browser.</p><p>Usually, you have to manually configure controls. But if you’re using Typescript, you can reuse Material UI’s component prop types to auto generate story controls. As a bonus, this will also automatically populate the prop table in your documentation tab.</p><figure class="kg-card kg-image-card"><img src="https://storybookblog.ghost.io/content/images/2022/10/2022-10-04-15.48.29.gif" class="kg-image" alt="Changing the button components props using Storybook controls" loading="lazy" width="2000" height="1889" srcset="https://storybookblog.ghost.io/content/images/size/w600/2022/10/2022-10-04-15.48.29.gif 600w, https://storybookblog.ghost.io/content/images/size/w1000/2022/10/2022-10-04-15.48.29.gif 1000w, https://storybookblog.ghost.io/content/images/size/w1600/2022/10/2022-10-04-15.48.29.gif 1600w, https://storybookblog.ghost.io/content/images/2022/10/2022-10-04-15.48.29.gif 2244w" sizes="(min-width: 720px) 720px"></figure><p>Let’s take the following Button component for example.</p><pre><code class="language-jsx">// button.component.tsx
 
import React from 'react';
import { Button as MuiButton } from '@mui/material';
 
export interface ButtonProps {
  label: string;
}
 
export const Button = ({ label, ...rest }: ButtonProps) =&gt; (
  &lt;MuiButton {...rest}&gt;{label}&lt;/MuiButton&gt;
);</code></pre><p>Here I’m using the label prop as the <code>MuiButton</code>’s child and passing all other props through. However, when we render this into Storybook, our controls panel only lets us change the label prop that we declared ourselves.</p><figure class="kg-card kg-image-card"><img src="https://lh5.googleusercontent.com/ytI83Pvj6fPPl_OipK-4sF3rz_XMS4x6m6uSwkAI4nJ76Pqph8FOk9mb3hRNDCoV0xXLHX4pnXXvpq5EH1ysTnmXj61tdN94fVm1yjgMP58ow0QLWWL4_ouZIJcZ4LhKxyAZ8kKDybhOiZZfyAFeA9JqJpE51GzKgnoE8J0ByTYQ5p6ViKgw3J01Aw" class="kg-image" alt="The button story with only a label prop control" loading="lazy" width="689" height="638"></figure><p>This is because Storybook only adds props to the controls table that are explicitly declared in the component’s prop types or in the Story Args. Let’s update Storybook’s Docgen configuration to bring Material UI‘s Button props into the controls table as well.</p><pre><code class="language-ts">// .storybook/main.ts
 
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
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
      propFilter: (prop) =&gt;
        prop.parent
          ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName)
          : true,
    },
  },
};</code></pre><p><br>We also want to update the parameters in <code>.storybook/preview.js</code> to show the description and default columns for the controls table.</p><pre><code class="language-js">// .storybook/preview.js
 
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true, // Adds the description and default columns
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
</code></pre><p>Lastly, update the <code>ButtonProps</code> type to extend from Material UI’s Button props to add all of these props to the controls.</p><pre><code class="language-tsx">// button.component.tsx
 
import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
 
export interface ButtonProps extends MuiButtonProps {
  label: string;
}
 
export const Button = ({ label, ...rest }: ButtonProps) =&gt; (
  &lt;MuiButton {...rest}&gt;{label}&lt;/MuiButton&gt;
);</code></pre><p>Restart your Storybook server so that these config changes take effect. You should now see that Button has controls for all of <code>MuiButton</code>'s props as well.</p><figure class="kg-card kg-image-card"><img src="https://lh3.googleusercontent.com/Km5jyCjJw_qhnmgQvlrIELxixgqwNN4FqCGbY1sjDBDI49owJg1xgwwoPBp9yRuumGzP9tlBXtOVOxqwnyLVNano2TzgV8zjXzbc7LtpE1PuaaY5GXVzRmAUP5W7t24KmNfH8HU8lB7VHpV14UTvUP9H6n1faDoJ9xfpAL4lx8-Yqgkgb9f-FKhkoQ" class="kg-image" alt="The button story with all 27 prop controls from the MUI button props" loading="lazy" width="665" height="616"></figure><h3 id="choose-which-controls-are-visible">Choose which controls are visible</h3><p>Our button now has <strong>27 props</strong>, which is perhaps a little much for your use case. To control which props are visible we can use TypeScript’s <a href="https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys"><code>Pick&lt;type, keys&gt;</code></a> and <a href="https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys"><code>Omit&lt;type, keys&gt;</code></a> utilities.</p><pre><code class="language-tsx">// button.component.tsx

import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

// Only include variant, size, and color
type ButtonBaseProps = Pick&lt;MuiButtonProps, "variant" | "size" | "color"&gt;;

// Use all except disableRipple
// type ButtonBaseProps = Omit&lt;MuiButtonProps, "disableRipple"&gt;;

export interface ButtonProps extends ButtonBaseProps {
  label: string;
}

export const Button = ({ label, ...rest }: ButtonProps) =&gt; (
  &lt;MuiButton {...rest}&gt;{label}&lt;/MuiButton&gt;
);</code></pre><p>And now our Button will only take the variant, size, and color props from <code>MuiButton</code>.</p><figure class="kg-card kg-image-card"><img src="https://lh3.googleusercontent.com/lqYwmkGTpx1aiKkPILYcsPs5WChsgI8PLO45Dba6LXk1GeKsTJhy_5F7BWIydAOinZ9nyxOeFB9OjUE3T_lEc1jFFAPpymN4SdMa2TIe0Cu9aASmPEtO6JbGrdpzfHisTgeaeVHNVdqYzjmKZl_VxsBEBqKTsg0bMn9p-oRKqbcdu_5jOhyuBSNuYA" class="kg-image" alt="The button story with only the controls specified" loading="lazy" width="679" height="640"></figure><p>📣 Shout out to <a href="https://twitter.com/ejmudrak">Eric Mudrak’s</a> awesome <a href="https://www.erikmudrak.com/post/storybook-with-react-typescript">Storybook with React &amp; TypeScript</a> article that inspired this tip.</p>`;

const authors = [
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

const addons = [
  {
    id: '0',
    displayName: 'Material-UI',
    icon: 'https://raw.githubusercontent.com/react-theming/storybook-addon-material-ui/master/docs/logos/material-ui.png',
    name: 'storybook-addon-material-ui',
    description: 'Storybook Addon for Material UI Library',
    weeklyDownloads: 17143,
    authors,
  },
  {
    id: '1',
    displayName: 'React Theming',
    name: '@react-theming/storybook-addon',
    description:
      'Develop themes and themable components with Emotion, Styled Components, Material-UI and your custom solution',
    weeklyDownloads: 12253,
    authors: authors.slice(0, 2),
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
      appearance: 'community',
      name: 'storybook-mobile',
      displayName: 'Mobile UX lint',
      description: 'Interact with component inputs dynamically in the Storybook UI',
      weeklyDownloads: 17143,
      publishedAt: 1604552400000,
      repositoryUrl: 'http://github.com/',
      homepageUrl: 'http://github.com/',
      authors,
      tags,
      readme,
      addons,
      ...recipe,
    }}
    location={{}}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  recipe: {
    icon: MuiSVG,
    displayName: 'Material UI',
    name: '@mui/material',
    description:
      "Material UI is component library styled based on Google's Material Design spec. This recipe shows you how to get the most out of Material UI in Storybook.",
  },
};

export const MoreThanFiveAuthors = Template.bind({});
MoreThanFiveAuthors.args = {
  recipe: {
    icon: MuiSVG,
    displayName: 'Material UI',
    name: '@mui/material',
    description:
      "Material UI is component library styled based on Google's Material Design spec. This recipe shows you how to get the most out of Material UI in Storybook.",
    authors: [...authors, ...authors.map((a, idx) => ({ ...a, id: a.id + idx }))],
  },
};

export const WithFromBreadcrumb = Template.bind({});
WithFromBreadcrumb.args = {
  recipe: {
    icon: MuiSVG,
    displayName: 'Material UI',
    name: '@mui/material',
    description:
      "Material UI is component library styled based on Google's Material Design spec. This recipe shows you how to get the most out of Material UI in Storybook.",
  },
  location: {
    state: {
      from: {
        link: '/addons/data-state',
        title: 'Data & State',
      },
    },
  },
};
