import React from 'react';
import { MDXPreCodeSnippet } from './MDXPreCodeSnippet';
import { SyntaxHighlighterContextProvider } from '../SyntaxHighlighterContext';

import { exampleTSWithNameComment } from '../utils/fixtures/string-snippets/example-stories';
import BASH_SNIPPET from '../utils/fixtures/string-snippets/example-terminal';
import { exampleVueWithNameComment } from '../utils/fixtures/string-snippets/example-vue';

const meta = {
  title: 'Basics/CodeSnippets/MDXPreCodeSnippet',
  component: MDXPreCodeSnippet,
  argTypes: {
    children: {
      table: { disable: true },
    },
  },
  decorators: [
    (Story) => <div style={{ margin: '2rem' }}>{Story()}</div>,
    (Story) => <SyntaxHighlighterContextProvider>{Story()}</SyntaxHighlighterContextProvider>,
  ],
};

export default meta;

export const TypescriptSnippet = {
  args: {
    children: <code className="language-ts">{exampleTSWithNameComment}</code>,
  },
};

export const VueSnippet = {
  args: {
    children: <code className="language-vue">{exampleVueWithNameComment}</code>,
  },
};

export const TerminalSnippet = {
  args: {
    children: <code className="language-shell">{BASH_SNIPPET}</code>,
  },
};

// FIX: I'm broken :( I don't know how to get the children to render
const simpleSnippet = 'https://tetra.chromatic.com';
export const NoHeader = {
  args: {
    children: <code>{simpleSnippet}</code>,
  },
};
