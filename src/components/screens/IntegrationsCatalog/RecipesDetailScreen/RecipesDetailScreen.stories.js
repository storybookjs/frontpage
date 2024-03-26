import React from 'react';
import { RecipesDetailScreen } from './RecipesDetailScreen';
import { addonItemsData } from '../../../layout/integrations/addons/AddonsGrid.stories';
import compiledMDX from '../../../../../.storybook/compiled-mdx';
import { UseAddonsSearchDecorator } from '../../../../../.storybook/use-addons-search.mock';

const MuiSVG = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M33.714 26.64a1.112 1.112 0 0 0 .558-.96l.02-6.43a1.111 1.111 0 0 1 .558-.96l3.485-2.002A1.11 1.11 0 0 1 40 17.25v11.69a1.112 1.112 0 0 1-.558.963L26.288 37.46a1.112 1.112 0 0 1-1.105.001L14.86 31.557a1.11 1.11 0 0 1-.56-.965v-5.894c0-.007.008-.011.014-.008.006.003.014 0 .014-.008v-.006c0-.005.002-.01.006-.011l8.503-4.885c.007-.004.004-.017-.005-.017-.002 0-.005 0-.006-.002a.009.009 0 0 1-.003-.006l.017-5.78a1.112 1.112 0 0 0-1.667-.966l-6.319 3.641a1.11 1.11 0 0 1-1.109 0L7.407 13a1.11 1.11 0 0 0-1.666.962v10.445a1.112 1.112 0 0 1-1.662.965L.56 23.362a1.111 1.111 0 0 1-.56-.967L.032 4.139a1.111 1.111 0 0 1 1.665-.961l12.05 6.921a1.111 1.111 0 0 0 1.106 0L26.9 3.178a1.11 1.11 0 0 1 1.664.964v18.26a1.11 1.11 0 0 1-.556.964l-6.31 3.633a1.11 1.11 0 0 0 .005 1.928l3.48 1.98a1.111 1.111 0 0 0 1.104-.001l7.427-4.266Zm.73-16.38a1.11 1.11 0 0 0 1.682.952l3.334-2A1.112 1.112 0 0 0 40 8.26V4.185a1.112 1.112 0 0 0-1.682-.952l-3.334 2a1.111 1.111 0 0 0-.54.953v4.075Z' fill='%23007FFF'/%3E%3C/svg%3E`;

export default {
  title: 'Integrations Catalog/Screens/RecipesDetailScreen',
  component: RecipesDetailScreen,
  decorators: [UseAddonsSearchDecorator],
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
    pageLayout: {
      pathname: '/integrations',
    },
  },
};

const muiRecipe = {
  icon: MuiSVG,
  accentColor: '#000',
  displayName: 'Material UI',
  name: '@mui/material',
  description: "Material UI is component library styled based on Google's Material Design spec.",
  authors: [
    {
      id: '0',
      name: 'Shaun Lloyd',
      avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
    },
  ],
  addons: addonItemsData.slice(0, 2),
  readme: compiledMDX,
};

const extraAuthors = [
  {
    id: '10',
    name: 'Shaun Lloyd',
    avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
  },
  {
    id: '11',
    name: 'Dominic Nguyen',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/263385',
  },
  {
    id: '12',
    name: 'Tom Coleman',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
  },
  {
    id: '13',
    name: 'Zoltan Olah',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
  },
  {
    id: '14',
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
      description: 'Interact with component inputs dynamically in the Storybook UI.',
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

export const Default = {
  render: Template,

  args: {
    recipe: muiRecipe,
  },
};

export const MoreThanFiveAuthors = {
  render: Template,

  args: {
    recipe: {
      ...muiRecipe,
      authors: [...muiRecipe.authors, ...extraAuthors],
    },
  },
};

export const NoAddons = {
  render: Template,

  args: {
    recipe: {
      ...muiRecipe,
      addons: [],
    },
  },
};

export const WithFromBreadcrumb = {
  render: Template,

  args: {
    recipe: muiRecipe,
    location: {
      state: {
        from: {
          link: '/addons/data-state',
          title: 'Data & State',
        },
      },
    },
  },
};
