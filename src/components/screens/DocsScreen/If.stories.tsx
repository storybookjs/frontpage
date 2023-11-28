import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react/types-6-0';

import useSiteMetadata from '../../../../.storybook/useSiteMetadata';
import { If } from './If';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { allRenderers } = useSiteMetadata();

type IfProps = React.ComponentProps<typeof If>;

const meta: Meta<IfProps> = {
  title: 'Screens/DocsScreen/If',
  component: If,
  argTypes: {
    allRenderers: {
      table: { disable: true },
    },
    currentRenderer: {
      table: { disable: true },
    },
  },
  args: {
    children: '👀 Can you see me?',
    allRenderers,
    currentRenderer: 'vue',
  },
  parameters: {
    chromatic: {
      viewports: [200],
    },
  },
};
export default meta;

const Template: StoryFn<IfProps> = (args) => <If {...args} />;

export const SingleIncludeIsVisible = Template.bind({});
SingleIncludeIsVisible.args = {
  renderer: 'vue',
};

export const MultipleIncludeIsVisible = Template.bind({});
MultipleIncludeIsVisible.args = {
  renderer: ['vue', 'react'],
};

export const SingleIncludeIsNotVisible = Template.bind({});
SingleIncludeIsNotVisible.args = {
  children: '👻 This should not be visible',
  renderer: 'react',
};

export const MultipleIncludeIsNotVisible = Template.bind({});
MultipleIncludeIsNotVisible.args = {
  children: '👻 This should not be visible',
  renderer: ['angular', 'react'],
};

export const SingleExcludeIsVisible = Template.bind({});
SingleExcludeIsVisible.args = {
  notRenderer: 'react',
};

export const MultipleExcludeIsVisible = Template.bind({});
MultipleExcludeIsVisible.args = {
  notRenderer: ['angular', 'react'],
};

export const MixedExclusiveIsVisible = Template.bind({});
MixedExclusiveIsVisible.args = {
  notRenderer: ['angular'],
  renderer: ['vue', 'react'],
};

export const MixedInclusiveIsNotVisible = Template.bind({});
MixedInclusiveIsNotVisible.args = {
  notRenderer: ['vue'],
  renderer: ['vue', 'react'],
};
