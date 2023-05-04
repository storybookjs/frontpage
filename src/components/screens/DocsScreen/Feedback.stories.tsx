import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Feedback } from './Feedback';

type FeedbackProps = React.ComponentProps<typeof Feedback> & {
  forceRating?: 'up' | 'down';
  forceResultUrl?: string;
  forceError?: string;
};

// To ensure Chromatic can snapshot correctly
const withHeight = (StoryFn, { parameters: { height } }) =>
  height ? (
    <div style={{ height }}>
      <StoryFn />
    </div>
  ) : (
    <StoryFn />
  );

const meta: Meta<FeedbackProps> = {
  title: 'Screens/DocsScreen/Feedback',
  component: Feedback,
  decorators: [
    // @ts-expect-error - It doesn't like the custom parameter
    withHeight,
  ],
};
export default meta;

const Template: Story<FeedbackProps> = (args) => <Feedback {...args} />;

export const Default = Template.bind({});

export const Rated = Template.bind({});
Rated.args = {
  forceRating: 'up',
};

export const Done = Template.bind({});
Done.args = {
  forceResultUrl:
    'https://github.com/storybookjs/storybook/discussions/categories/documentation-feedback',
};

export const Error = Template.bind({});
Error.args = {
  forceError: 'Forced error',
};
