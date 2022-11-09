import React from 'react';
import { RecipeItemDetail } from './RecipeItemDetail';
import MuiSVG from '../../../images/integrations/mui.svg';

export default {
  title: 'Integrations Catalog/Layout/recipes/RecipeItemDetail',
  component: RecipeItemDetail,
  parameters: {
    chromatic: { viewports: [320, 900] },
  },
};

const Template = (args) => <RecipeItemDetail {...args} />;

export const OfficialStorybook = Template.bind({});
OfficialStorybook.args = {
  icon: MuiSVG,
  name: '@mui/material',
  displayName: 'Material UI',
  description:
    "Material UI is component library styled based on Google's Material Design spec. This recipe shows you how to get the most out of Material UI in Storybook.",
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  name: 'react-native',
  displayName: 'React Native',
  description:
    'React Native is a React framework for building multi-platform mobile applications. This recipe shows you how to build your React Native components in isolation with Storybook.',
};
