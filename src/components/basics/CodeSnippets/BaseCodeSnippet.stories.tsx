import React from 'react';
import { BaseCodeSnippet } from './BaseCodeSnippet';
import { SyntaxHighlighterContextProvider } from './SyntaxHighlighterContext';
import { LanguageSelector } from './LanguageSelector';

import TS_SNIPPET from './utils/fixtures/string-snippets/example-stories';
import BASH_SNIPPET from './utils/fixtures/string-snippets/example-terminal';
import VUE_SNIPPET from './utils/fixtures/string-snippets/example-vue';

const meta = {
  title: 'Basics/CodeSnippets/Presentational',
  component: BaseCodeSnippet,
  decorators: [
    (Story) => <div style={{ margin: '2rem' }}>{Story()}</div>,
    (Story) => <SyntaxHighlighterContextProvider>{Story()}</SyntaxHighlighterContextProvider>,
  ],
};

export default meta;

export const TypescriptSnippet = {
  args: {
    snippet: TS_SNIPPET,
    syntax: 'ts',
  },
};

export const WithLanguageSelector = {
  args: {
    snippet: TS_SNIPPET,
    syntax: 'ts',
    renderLanguageSelector: () => (
      <LanguageSelector
        items={[
          { id: 'ts', label: 'TypeScript', value: 'ts' },
          { id: 'ts-4-9', label: 'TypeScript 4.9', value: 'ts4.9' },
          { id: 'js', label: 'JavaScript', value: 'js' },
        ]}
      />
    ),
  },
};

export const VueSnippet = {
  args: {
    snippet: VUE_SNIPPET,
    syntax: 'vue',
  },
};

export const TerminalSnippet = {
  args: {
    snippet: BASH_SNIPPET,
    syntax: 'sh',
    isTerminal: true,
  },
};
