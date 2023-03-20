import * as React from 'react';
import useSiteMetadata from '../../../../.storybook/useSiteMetadata';
import { DocsContextProvider } from './DocsContext';
import { Sandboxes } from './Sandboxes';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { coreFrameworks, communityFrameworks } = useSiteMetadata();

export default {
  title: 'Screens/DocsScreen/Sandboxes',
  component: Sandboxes,
  args: {
    framework: 'react',
  },
  argTypes: {
    framework: {
      options: [...coreFrameworks, ...communityFrameworks],
    },
  },
  decorators: [
    (Story, { args: { framework, ...args } }) => (
      <DocsContextProvider framework={framework}>
        <div style={{ padding: '1rem' }}>
          <Story args={args} />
        </div>
      </DocsContextProvider>
    ),
  ],
};

const Template = (args) => <Sandboxes {...args} />;

export const ReactStory = Template.bind({});
ReactStory.storyName = 'React';

export const Vue = Template.bind({});
Vue.args = {
  framework: 'vue',
};

export const WebComponents = Template.bind({});
WebComponents.args = {
  framework: 'web-components',
};

export const NoSandboxes = Template.bind({});
NoSandboxes.args = {
  framework: 'nextjs',
};
