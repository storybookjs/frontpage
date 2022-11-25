import React from 'react';
import { styled } from '@storybook/theming';
import { RecipeItem } from './RecipeItem';

const NextJsSVG = `data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M20.559.012c-.095.008-.396.039-.667.06-6.25.563-12.103 3.935-15.81 9.117A21.775 21.775 0 0 0 .196 18.8C.021 20.01 0 20.366 0 22.005 0 23.643.02 24 .197 25.208c1.196 8.261 7.076 15.202 15.05 17.774 1.428.46 2.933.774 4.645.963.667.073 3.548.073 4.215 0 2.955-.327 5.458-1.058 7.927-2.318.378-.193.452-.245.4-.288-.034-.026-1.647-2.189-3.583-4.803l-3.518-4.753-4.409-6.523c-2.426-3.587-4.421-6.52-4.439-6.52-.017-.004-.034 2.895-.043 6.434-.012 6.197-.017 6.446-.094 6.592-.112.211-.198.297-.379.392-.137.069-.258.081-.907.081h-.744l-.198-.124a.805.805 0 0 1-.288-.314l-.09-.194.008-8.622.013-8.627.133-.168c.07-.09.215-.206.319-.262.176-.086.245-.095.989-.095.877 0 1.023.035 1.251.284.065.07 2.452 3.664 5.308 7.995 2.856 4.33 6.761 10.244 8.68 13.146l3.483 5.277.177-.116c1.561-1.015 3.213-2.46 4.52-3.965a21.898 21.898 0 0 0 5.179-11.246c.176-1.208.197-1.565.197-3.204 0-1.638-.021-1.995-.197-3.204-1.196-8.26-7.076-15.202-15.05-17.773-1.406-.456-2.903-.77-4.58-.96-.413-.042-3.256-.09-3.613-.055Zm9.006 13.305a.867.867 0 0 1 .434.508c.035.112.044 2.503.035 7.891l-.013 7.732-1.363-2.09-1.368-2.09v-5.62c0-3.634.017-5.677.043-5.776.069-.24.22-.43.426-.542.176-.09.24-.099.916-.099.636 0 .748.009.89.086Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h44v44H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E`;

export default {
  title: 'Integrations Catalog/Layout/Recipes/RecipeItem',
  component: RecipeItem,
  parameters: {
    chromatic: { viewports: [320, 900] },
  },
};

const authors = [
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

const Wrapper = styled.div`
  padding: 16px;

  > h2 {
    font-size: 16px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 16px;
  }

  > h2:last-of-type {
    margin-top: 64px;
  }
`;

const Template = (args) => (
  <Wrapper>
    <h2>Horizontal</h2>
    <RecipeItem {...args} />
    <h2>Vertical</h2>
    <RecipeItem orientation="vertical" style={{ width: 300 }} {...args} />
  </Wrapper>
);

export const WithLibraryIcon = Template.bind({});
WithLibraryIcon.args = {
  icon: NextJsSVG,
  accentColor: '#000',
  displayName: 'Next.js',
  description: 'A low config way to get your Next.js UI working in Storybook',
  views: 17143,
  authors,
};

export const WithoutLibraryIcon = Template.bind({});
WithoutLibraryIcon.args = {
  displayName: 'Material UI',
  description: 'Get the most out of Material UI in your Storybook',
  views: 238,
  authors,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

const StatsWrapper = styled.div`
  > * {
    margin-bottom: 16px;
  }
`;

export const StatVariations = (args) => (
  <StatsWrapper>
    <RecipeItem {...args} views={104} authors={authors.slice(0, 2)} />
    <RecipeItem {...args} views={726} authors={authors.slice(0, 1)} />
    <RecipeItem {...args} views={5026} authors={authors} />
    <RecipeItem {...args} views={17143} authors={authors.slice(1, 2)} />
    <RecipeItem {...args} views={171043} authors={authors} />
    <RecipeItem {...args} views={3871043} authors={authors.slice(1, 2)} />
  </StatsWrapper>
);
StatVariations.args = {
  orientation: 'horizontal',
  icon: NextJsSVG,
  accentColor: '#000',
  name: 'next',
  displayName: 'Next.js',
  description: 'How to hook up your Next.js app in Storybook',
};
