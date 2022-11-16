import React from 'react';
import { RecipesDetailScreen } from './RecipesDetailScreen';
import MuiSVG from '../../../images/integrations/mui.svg';

import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';
import { PurePageLayout } from '../../layout/PageLayout';

import { dxData } from '../../layout/PageLayout.stories';

export default {
  title: 'Integrations Catalog/Screens/RecipesDetailScreen',
  component: RecipesDetailScreen,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
  },
};

const muiRecipe = {
  icon: MuiSVG,
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
    '<p>This recipe assumes that you already have a React app using the <code>@mui/material</code> package set up with Storybook 6.0 or newer. If you don’t have a project ready, clone my <a href="https://github.com/ShaunLloyd/storybook-mui-example">example repository</a> to follow along.</p>\n<h2>Bundle fonts and icons for better perf</h2>\n<p>Material UI depends on two fonts to render as intended, Google’s <a href="https://fonts.google.com/specimen/Roboto"><code>Roboto</code></a> and <a href="https://fonts.google.com/icons?query=Christian+Robertson&#x26;icon.style=Outlined&#x26;icon.set=Material+Icons"><code>Material Icons</code></a>. While you can load these fonts directly from the Google Fonts CDN, bundling fonts with Storybook is better for performance.</p>\n<ul>\n<li>🏎️ <strong>Fonts load faster</strong> because they are coming from the same place as your app</li>\n<li>✈️ <strong>Font will load offline</strong> so you can continue developing your stories anywhere</li>\n<li>📸 <strong>No more inconsistent snapshot tests</strong> because fonts load instantly</li>\n</ul>\n<p>To get started, install the fonts as dependencies.</p>\n<pre><code class="language-bash">yarn add @fontsource/roboto @fontsource/material-icons\n</code></pre>\n<p>Then import the CSS files into <code>.storybook/preview.js</code>, the entrypoint of your storybook.</p>\n<pre><code class="language-javascript">// .storybook/preview.js\n\nimport \'@fontsource/roboto/300.css\';\nimport \'@fontsource/roboto/400.css\';\nimport \'@fontsource/roboto/500.css\';\nimport \'@fontsource/roboto/700.css\';\nimport \'@fontsource/material-icons\';\n</code></pre>\n<h2>Load custom themes and add a theme switcher</h2>\n<p>Material UI comes with a default theme out of the box, but you can also create and provide your own themes. Given the popularity of dark mode, you\'ll likely end with more than one custom theme. Let\'s look at how you can load custom themes and switch between them with just a click.</p>\n<p><img src="https://lh3.googleusercontent.com/O5NeQidj2tK5hbgw6oT_25HZLm4VUkpUgLUcIsFEahslc0Y8mweYVR6gAflPidqEwTUWedVXC_Xt58OEqbzJc4xWvFnjWyQmWCGbcLSa_RWK41G5_iZ8-LvkWcemfg5TV6tF_VFXj6GHNFIK92z_WvEKspVDBUqX6a1EirtwMIprFhPY8sHDudwpWQ" alt="Storybook changing to the provided dark theme"></p>\n<p>For example, take this custom dark mode theme.</p>',
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
  <PurePageLayout dxData={dxData} pageContext={{}} location={{ pathname: '/recipe/' }}>
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
  </PurePageLayout>
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
