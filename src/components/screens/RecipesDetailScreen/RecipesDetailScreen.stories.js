import React from 'react';
import { RecipesDetailScreen } from './RecipesDetailScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';

const MuiSVG = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M33.714 26.64a1.112 1.112 0 0 0 .558-.96l.02-6.43a1.111 1.111 0 0 1 .558-.96l3.485-2.002A1.11 1.11 0 0 1 40 17.25v11.69a1.112 1.112 0 0 1-.558.963L26.288 37.46a1.112 1.112 0 0 1-1.105.001L14.86 31.557a1.11 1.11 0 0 1-.56-.965v-5.894c0-.007.008-.011.014-.008.006.003.014 0 .014-.008v-.006c0-.005.002-.01.006-.011l8.503-4.885c.007-.004.004-.017-.005-.017-.002 0-.005 0-.006-.002a.009.009 0 0 1-.003-.006l.017-5.78a1.112 1.112 0 0 0-1.667-.966l-6.319 3.641a1.11 1.11 0 0 1-1.109 0L7.407 13a1.11 1.11 0 0 0-1.666.962v10.445a1.112 1.112 0 0 1-1.662.965L.56 23.362a1.111 1.111 0 0 1-.56-.967L.032 4.139a1.111 1.111 0 0 1 1.665-.961l12.05 6.921a1.111 1.111 0 0 0 1.106 0L26.9 3.178a1.11 1.11 0 0 1 1.664.964v18.26a1.11 1.11 0 0 1-.556.964l-6.31 3.633a1.11 1.11 0 0 0 .005 1.928l3.48 1.98a1.111 1.111 0 0 0 1.104-.001l7.427-4.266Zm.73-16.38a1.11 1.11 0 0 0 1.682.952l3.334-2A1.112 1.112 0 0 0 40 8.26V4.185a1.112 1.112 0 0 0-1.682-.952l-3.334 2a1.111 1.111 0 0 0-.54.953v4.075Z' fill='%23007FFF'/%3E%3C/svg%3E`;

export default {
  title: 'Integrations Catalog/Screens/RecipesDetailScreen',
  component: RecipesDetailScreen,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
    pageLayout: {
      path: '/integrations',
    },
  },
};

const muiRecipe = {
  icon: MuiSVG,
  accentColor: '#000',
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
  addons: addonItemsData.slice(0, 2),
  readme:
    "<p>This recipe assumes that you already have a React app using the <code>@mui/material</code> package set up with Storybook 6.0 or newer. If you don’t have a project ready, clone my <a href=\"https://github.com/ShaunLloyd/storybook-mui-example\">example repository</a> to follow along.</p>\n<h2>Bundle fonts and icons for better perf</h2>\n<p>Material UI depends on two fonts to render as intended, Google’s <a href=\"https://fonts.google.com/specimen/Roboto\"><code>Roboto</code></a> and <a href=\"https://fonts.google.com/icons?query=Christian+Robertson&#x26;icon.style=Outlined&#x26;icon.set=Material+Icons\"><code>Material Icons</code></a>. While you can load these fonts directly from the Google Fonts CDN, bundling fonts with Storybook is better for performance.</p>\n<ul>\n<li>🏎️ <strong>Fonts load faster</strong> because they are coming from the same place as your app</li>\n<li>✈️ <strong>Font will load offline</strong> so you can continue developing your stories anywhere</li>\n<li>📸 <strong>No more inconsistent snapshot tests</strong> because fonts load instantly</li>\n</ul>\n<p>To get started, install the fonts as dependencies.</p>\n<pre><code class=\"language-bash\">yarn add @fontsource/roboto @fontsource/material-icons\n</code></pre>\n<p>Then import the CSS files into <code>.storybook/preview.js</code>, the entrypoint of your storybook.</p>\n<pre><code class=\"language-javascript\">// .storybook/preview.js\n\nimport '@fontsource/roboto/300.css';\nimport '@fontsource/roboto/400.css';\nimport '@fontsource/roboto/500.css';\nimport '@fontsource/roboto/700.css';\nimport '@fontsource/material-icons';\n</code></pre>\n<h2>Load custom themes and add a theme switcher</h2>\n<p>Material UI comes with a default theme out of the box, but you can also create and provide your own themes. Given the popularity of dark mode, you'll likely end with more than one custom theme. Let's look at how you can load custom themes and switch between them with just a click.</p>\n\n<p>For example, take this custom dark mode theme.</p>",
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
      lastUpdatedAt: 1604552400000,
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

export const NoAddons = Template.bind({});
NoAddons.args = {
  recipe: {
    ...muiRecipe,
    addons: [],
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
