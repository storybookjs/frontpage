import React from 'react';
import { RecipesDetailScreen } from './RecipesDetailScreen';
import muiRecipe from '../../../content/recipes/material-ui';
import i18nextRecipe from '../../../content/recipes/react-i18next';

export default {
  title: 'Frontpage|screens/RecipesDetailScreen',
  component: RecipesDetailScreen,
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
      weeklyDownloads: 17143,
      publishedAt: 1604552400000,
      repositoryUrl: 'http://github.com/',
      homepageUrl: 'http://github.com/',
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
    ...i18nextRecipe,
    authors: [...i18nextRecipe.authors, ...extraAuthors],
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
