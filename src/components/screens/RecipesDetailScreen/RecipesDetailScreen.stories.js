import React from 'react';
import { RecipesDetailScreen } from './RecipesDetailScreen';

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
  readme: '',
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
      appearance: 'community',
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
