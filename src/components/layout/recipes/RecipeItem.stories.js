import React from 'react';
import { styled } from '@storybook/theming';
import { RecipeItem } from './RecipeItem';
import NextJsSVG from '../../../images/integrations/nextjs.svg';

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

export const WithImage = Template.bind({});
WithImage.args = {
  icon: NextJsSVG,
  displayName: 'Next.js',
  description: 'A low config way to get your Next.js UI working in Storybook',
  views: 17143,
  authors,
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
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
  name: 'next',
  displayName: 'Next.js',
  description: 'How to hook up your Next.js app in Storybook',
};
