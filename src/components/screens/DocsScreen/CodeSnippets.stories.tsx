import React from 'react';
import styled from 'styled-components';
import { Highlight } from '@storybook/design-system';

import { PureCodeSnippets, TabLabel } from './CodeSnippets';
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

export const Base = () => <PureCodeSnippets snippets={[snippets[0]]} />;

export const Multiple = () => <PureCodeSnippets snippets={snippets} />;
