import * as React from 'react';

import { SyntaxHighlighterContextProvider } from '../SyntaxHighlighterContext';
import { BaseCodeSnippet } from './BaseCodeSnippet';
import { LanguageSelector } from '../../LanguageSelector';

import languageSelectorMeta from '../../LanguageSelector/LanguageSelector.stories';
import TS_SNIPPET from '../utils/fixtures/string-snippets/example-stories';
import BASH_SNIPPET from '../utils/fixtures/string-snippets/example-terminal';
import VUE_SNIPPET from '../utils/fixtures/string-snippets/example-vue';
import { CSF2Example, MissingCodeLanguage } from './SnippetEyebrows';

const meta = {
  title: 'Basics/BaseCodeSnippet',
  component: BaseCodeSnippet,
  decorators: [(Story) => <div style={{ margin: '2rem' }}>{Story()}</div>],
};

export default meta;

export const TypescriptSnippet = {
  args: {
    snippet: TS_SNIPPET,
    syntax: 'ts',
    title: 'Button.stories.ts',
  },
  decorators: [
    (Story) => <SyntaxHighlighterContextProvider>{Story()}</SyntaxHighlighterContextProvider>,
  ],
};

export const WithLanguageSelector = {
  ...TypescriptSnippet,
  args: {
    ...TypescriptSnippet.args,
    LanguageSelector: (
      <LanguageSelector
        items={languageSelectorMeta.args.items}
        value="TypeScript"
        onChange={() => {}}
      />
    ),
  },
};

export const WithInfoEyebrow = {
  ...TypescriptSnippet,
  args: {
    ...TypescriptSnippet.args,
    Eyebrow: <CSF2Example csf2Path="/writing-stories/decorators#story-decorators" />,
  },
};

export const WithWarningEyebrow = {
  ...TypescriptSnippet,
  args: {
    ...TypescriptSnippet.args,
    Eyebrow: <MissingCodeLanguage currentCodeLanguage="ts-4-9" fallbackLanguage="ts" />,
  },
};

export const VueSnippet = {
  ...TypescriptSnippet,
  args: {
    snippet: VUE_SNIPPET,
    syntax: 'vue',
    title: 'Button.vue',
  },
};

export const TerminalSnippet = {
  ...TypescriptSnippet,
  args: {
    snippet: BASH_SNIPPET,
    syntax: 'sh',
    title: 'Terminal',
  },
};

export const NoHeader = {
  ...TypescriptSnippet,
  args: {
    hideHeader: true,
    snippet: `https://tetra.chromatic.com`,
    syntax: '',
    title: '',
  },
};

export const NoHighlighterAvailable = {
  name: 'No highlighter available (loading)',
  args: TypescriptSnippet.args,
};
