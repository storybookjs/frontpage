import * as React from 'react';

import { SyntaxHighlighterContextProvider } from '../SyntaxHighlighterContext';
import { BaseCodeSnippet } from './BaseCodeSnippet';
import { LanguageSelector } from '../../LanguageSelector';

import languageSelectorMeta from '../../LanguageSelector/LanguageSelector.stories';
import TS_SNIPPET from '../utils/fixtures/string-snippets/example-stories';
import BASH_SNIPPET from '../utils/fixtures/string-snippets/example-terminal';
import VUE_SNIPPET from '../utils/fixtures/string-snippets/example-vue';

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
    title: 'Button.stories.ts',
  },
};

export const WithLanguageSelector = {
  args: {
    ...TypescriptSnippet.args,
    renderLanguageSelector: () => (
      <LanguageSelector
        items={languageSelectorMeta.args.items}
        value="TypeScript"
        onChange={() => {}}
      />
    ),
  },
};

export const VueSnippet = {
  args: {
    snippet: VUE_SNIPPET,
    syntax: 'vue',
    title: 'Button.vue',
  },
};

export const TerminalSnippet = {
  args: {
    isTerminal: true,
    snippet: BASH_SNIPPET,
    syntax: 'sh',
    title: 'Terminal',
  },
};

export const NoHeader = {
  args: {
    hideHeader: true,
    snippet: `https://tetra.chromatic.com`,
    syntax: '',
    title: '',
  },
};
