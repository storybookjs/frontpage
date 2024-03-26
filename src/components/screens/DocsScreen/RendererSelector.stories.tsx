import React from 'react';
import { styled } from '@storybook/theming';
import { screen, within, userEvent } from '@storybook/test';
import { RendererSelector } from './RendererSelector';
import useSiteMetadata from '../../../../.storybook/useSiteMetadata';
import { DocsContextProvider } from './DocsContext';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { coreRenderers, communityRenderers, defaultRenderer } = useSiteMetadata();

// Account for box-shadow on pills and height of open menu
const Wrapper = styled.div`
  min-height: 300px;
  padding: 1px;
`;

export default {
  title: 'Screens/DocsScreen/RendererSelector',
  component: RendererSelector,
  args: {
    coreRenderers,
    communityRenderers,
    renderer: defaultRenderer,
  },
  decorators: [
    (storyFn, { args: { renderer } }) => (
      <DocsContextProvider renderer={renderer}>
        <Wrapper>{storyFn()}</Wrapper>
      </DocsContextProvider>
    ),
  ],
};

const Template = (args) => <RendererSelector {...args} />;

export const Base = Template.bind({});
Base.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const moreMenu = canvas.getByRole('button', { name: 'More' });

  await userEvent.click(moreMenu);
};

export const SelectACoreRenderer = Template.bind({});
SelectACoreRenderer.args = {
  // Necesary to override the otherwise forced renderer
  renderer: undefined,
};
SelectACoreRenderer.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const vue = canvas.getByRole('button', { name: 'Vue' });

  await userEvent.click(vue);
};

export const CommunityRendererSelected = Template.bind({});
CommunityRendererSelected.args = {
  renderer: 'svelte',
};
CommunityRendererSelected.play = Base.play;

export const SelectACommunityRenderer = Template.bind({});
SelectACommunityRenderer.parameters = {
  // TODO: The play function finds the correct element, but clicking it does nothing.
  //       Clicking the element manually works fine.
  chromatic: { disableSnapshot: true },
};
SelectACommunityRenderer.args = {
  // Necesary to override the otherwise forced renderer
  renderer: undefined,
};
SelectACommunityRenderer.play = async (context) => {
  await Base.play(context);
  await SelectACoreRenderer.play(context);

  const html = await screen.findByRole('menuitem', { name: 'HTML' });

  await userEvent.click(html);
};

export const NarrowScreen = Template.bind({});
NarrowScreen.parameters = {
  chromatic: { viewports: [320] },
  viewport: { defaultViewport: 'smallMobile' },
};

export const NarrowScreenCommunityRendererSelected = Template.bind({});
NarrowScreenCommunityRendererSelected.parameters = NarrowScreen.parameters;
NarrowScreenCommunityRendererSelected.args = CommunityRendererSelected.args;
NarrowScreenCommunityRendererSelected.play = Base.play;
