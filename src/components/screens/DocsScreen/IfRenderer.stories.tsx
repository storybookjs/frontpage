import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react/types-6-0';

import { IfRenderer } from './IfRenderer';

type IfRendererProps = React.ComponentProps<typeof IfRenderer>;

const meta: Meta<IfRendererProps> = {
  title: 'Screens/DocsScreen/IfRenderer',
  component: IfRenderer,
  argTypes: {
    currentRenderer: {
      table: { disable: true },
    },
  },
  args: {
    children: '👀 Can you see me?',
    currentRenderer: 'vue',
  },
  parameters: {
    chromatic: {
      viewports: [200],
    },
  },
};
export default meta;

const Template: StoryFn<IfRendererProps> = (args) => <IfRenderer {...args} />;

export const NoMatch = Template.bind({});
NoMatch.args = {
  children: '👻 This should not be visible',
  renderer: 'react',
};

export const SingleMatch = Template.bind({});
SingleMatch.args = {
  renderer: 'vue',
};

export const MultipleMatches = Template.bind({});
MultipleMatches.args = {
  renderer: ['vue', 'react'],
};
