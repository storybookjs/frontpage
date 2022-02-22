import React from 'react';
import { styled } from '@storybook/theming';
import { DocsSearch } from './DocsSearch';

const { coreFrameworks } = require('../../../content/docs/frameworks');

// Mimicing Sidebar
const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  max-width: 200px;

  & > * {
    flex: 1;
  }
`;

export default {
  title: 'Frontpage|screens/DocsScreen/DocsSearch',
  component: DocsSearch,
  argTypes: {
    visible: { control: false },
  },
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const Template = (args) => <DocsSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  framework: coreFrameworks[0],
  visible: true,
};
