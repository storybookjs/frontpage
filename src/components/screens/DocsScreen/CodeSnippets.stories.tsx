import React from 'react';
import styled from 'styled-components';
import { Highlight } from '@storybook/design-system';

import { PureCodeSnippets, MissingMessage, TabLabel } from './CodeSnippets';
import { mdFormatting } from '../../../styles/formatting';
import compiledMDX from '../../../../.storybook/compiled-mdx';

const jsCode = `
// Button.stories.js

import React from 'react';
import { Button } from './Button';

export const Primary = () => <Button primary>Button</Button>;
`;

const tsCode = `
// Button.stories.js

import React from 'react';
import { Button } from './Button';

export const Primary: React.SFC<{}> = () => <Button primary>Button</Button>;
`;

function JSModuleComponent() {
  return <Highlight language="javascript">{jsCode}</Highlight>;
}

function TSModuleComponent() {
  return <Highlight language="typescript">{tsCode}</Highlight>;
}

const snippets = [
  {
    id: `react-js`,
    Snippet: JSModuleComponent,
    framework: 'react',
    syntax: 'js',
    renderTabLabel: ({ isActive }) => (
      <TabLabel framework="react" isActive={isActive} syntax="js" />
    ),
  },
  {
    id: `react-ts`,
    Snippet: TSModuleComponent,
    framework: 'react',
    syntax: 'ts',
    renderTabLabel: ({ isActive }) => (
      <TabLabel framework="react" isActive={isActive} syntax="ts" />
    ),
  },
];

const snippetsWithoutBadges = snippets.map((snippet, index) => ({
  ...snippet,
  renderTabLabel: ({ isActive }) => (
    <TabLabel framework="common" isActive={isActive} syntax={index === 0 ? 'mdx' : 'stories-of'} />
  ),
}));

const snippetsWithMissingMessaging = snippets.map((snippet, index) => ({
  ...snippet,
  PreSnippet: () => <MissingMessage currentFramework="angular" />,
  Snippet: TSModuleComponent,
}));

const Wrapper = styled.div`
  ${mdFormatting}
  padding: 10px;

  && pre[class*='language-'] {
    padding-top: 0;
  }
`;

export default {
  title: 'Frontpage|screens/DocsScreen/CodeSnippets',
  component: PureCodeSnippets,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

export const Base = () => <PureCodeSnippets currentFramework="react" snippets={[snippets[0]]} />;

export const Missing = () => (
  <PureCodeSnippets currentFramework="angular" snippets={[snippetsWithMissingMessaging[0]]} />
);

export const Multiple = () => <PureCodeSnippets currentFramework="react" snippets={snippets} />;

export const MultipleMissing = () => (
  <PureCodeSnippets currentFramework="angular" snippets={snippetsWithMissingMessaging} />
);

export const MultipleWithoutBadges = () => (
  <PureCodeSnippets currentFramework="react" snippets={snippetsWithoutBadges} />
);
