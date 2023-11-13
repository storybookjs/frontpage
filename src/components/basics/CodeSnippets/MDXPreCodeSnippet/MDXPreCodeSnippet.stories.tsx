import * as React from 'react';

import { MDXPreCodeSnippet } from '.';
import { SyntaxHighlighterContextProvider } from '../SyntaxHighlighterContext';
import { exampleTSWithNameComment } from '../utils/fixtures/string-snippets/example-stories';
import exampleTerminalSnippet from '../utils/fixtures/string-snippets/example-terminal';

const meta = {
  title: 'Basics/CodeSnippets/MDXPreCodeSnippet',
  component: MDXPreCodeSnippet,
  decorators: [
    (Story) => <div style={{ margin: '2rem' }}>{Story()}</div>,
    (Story) => <SyntaxHighlighterContextProvider>{Story()}</SyntaxHighlighterContextProvider>,
  ],
};

export default meta;

export const Basic = {
  args: {
    children: <code className="language-ts">{exampleTSWithNameComment}</code>,
  },
};

export const TerminalSnippet = {
  args: {
    children: <code className="language-shell">{exampleTerminalSnippet}</code>,
  },
};

export const NoHeader = {
  args: {
    children: (
      <code>
        {'Shaun Evening was here!\n\nThis should render like a Pre without syntax or header.'}
      </code>
    ),
  },
};
