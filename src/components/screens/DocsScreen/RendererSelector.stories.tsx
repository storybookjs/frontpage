import React from 'react';
import { styled } from '@storybook/theming';
import { within, userEvent } from '@storybook/testing-library';
import { RendererSelector } from './RendererSelector';
import useSiteMetadata from '../../../../.storybook/useSiteMetadata';
import { DocsContextProvider } from './DocsContext';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { coreRenderers, communityRenderers } = useSiteMetadata();

// The Wrapper helps capture the tooltip contents in the snapshot
const Wrapper = styled.span`
  display: inline-block;
  width: 225px;
  height: 510px;
`;

export default {
  title: 'Screens/DocsScreen/RendererSelector',
  component: RendererSelector,
  args: {
    coreRenderers,
    communityRenderers,
  },
  decorators: [
    (storyFn) => (
      <DocsContextProvider renderer={coreRenderers[0]}>
        <Wrapper>{storyFn()}</Wrapper>
      </DocsContextProvider>
    ),
  ],
};

const Template = (args) => <RendererSelector {...args} />;

export const Base = Template.bind({});
Base.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const menuButton = canvas.getByRole('button', { name: /React/i });
  await userEvent.click(menuButton);
  await userEvent.keyboard('{arrowdown}');
};
