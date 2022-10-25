import React from 'react';
import { styled } from '@storybook/theming';
import { RecipeItem } from './RecipeItem';
import NextJsSVG from '../../../images/integrations/nextjs.svg';

export default {
  title: 'Frontpage|layout/Recipes/RecipeItem',
  component: RecipeItem,
  chromatic: { viewports: [320, 900] },
};

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
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  displayName: 'Material UI',
  description: 'Get the most out of Material UI in your Storybook',
  views: 238,
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
    <RecipeItem {...args} views={104} />
    <RecipeItem {...args} views={726} />
    <RecipeItem {...args} views={5026} />
    <RecipeItem {...args} views={17143} />
    <RecipeItem {...args} views={171043} />
    <RecipeItem {...args} views={3871043} />
  </StatsWrapper>
);
StatVariations.args = {
  orientation: 'horizontal',
  icon: ControlsSVG,
  name: '@storybook/addon-controls',
  displayName: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
};
