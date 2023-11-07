import React from 'react';
import { styled } from '@storybook/theming';
import { within, userEvent } from '@storybook/testing-library';
import { FrameworkSelector } from './FrameworkSelector';
import useSiteMetadata from '../../../../.storybook/useSiteMetadata';
import { DocsContextProvider } from './DocsContext';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { coreFrameworks, communityFrameworks } = useSiteMetadata();

// The Wrapper helps capture the tooltip contents in the snapshot
const Wrapper = styled.span`
  display: inline-block;
  width: 225px;
  height: 510px;
`;

export default {
  title: 'Screens/DocsScreen/FrameworkSelector',
  component: FrameworkSelector,
  decorators: [
    (storyFn) => (
      <DocsContextProvider framework={coreFrameworks[0]}>
        <Wrapper>{storyFn()}</Wrapper>
      </DocsContextProvider>
    ),
  ],
};

const Template = (args) => <FrameworkSelector {...args} />;

export const Base = Template.bind({});
Base.args = {
  coreFrameworks,
  communityFrameworks,
};
Base.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const menuButton = canvas.getByRole('button', { name: /React/i });
  await userEvent.click(menuButton);
  await userEvent.keyboard('{arrowdown}');
};
