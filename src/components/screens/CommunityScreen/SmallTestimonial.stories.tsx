import React from 'react';
import { SmallTestimonial } from './SmallTestimonial';

export default {
  title: 'screens/CommunityScreen/SmallTestimonial',
  component: SmallTestimonial,
};

export const Default = (args) => <SmallTestimonial {...args} />;
Default.args = {
  quote:
    'Storybook was one of our best decisions for writing React components across web and native. It blows our old practices out of the water.',
  name: 'Orta Therox',
  title: 'Frontend infrastructure',
  avatarUrl: 'https://avatars1.githubusercontent.com/u/49038?s=100&v=4',
};
Default.storyName = 'SmallTestimonial';
