import * as React from 'react';

import { Pre } from './Pre';
import { SyntaxHighlighterContextProvider } from './CodeSnippets/SyntaxHighlighterContext';
import { exampleTSWithNameComment } from './CodeSnippets/utils/fixtures/string-snippets/example-stories';
import exampleTerminalSnippet from './CodeSnippets/utils/fixtures/string-snippets/example-terminal';

const meta = {
  title: 'Basics/Pre',
  component: Pre,
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
