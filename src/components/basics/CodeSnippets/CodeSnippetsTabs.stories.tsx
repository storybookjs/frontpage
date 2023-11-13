import * as React from 'react';

import { SyntaxHighlighterContextProvider } from './SyntaxHighlighterContext';
import { BaseCodeSnippet } from './BaseCodeSnippet/BaseCodeSnippet';
import { Tabs } from './CodeSnippetsTabs';
import { LanguageSelector } from '../LanguageSelector';

import languageSelectorMeta from '../LanguageSelector/LanguageSelector.stories';
import TS_SNIPPET from './utils/fixtures/string-snippets/example-stories';

const mockSnippets = [
  {
    key: `0-One`,
    tabName: 'One',
    content: `// One\n${TS_SNIPPET}`,
  },
  {
    key: `1-Two`,
    tabName: 'Two',
    content: `// Two\n${TS_SNIPPET}`,
  },
  {
    key: `2-Three`,
    tabName: 'Three',
    content: `// Three\n${TS_SNIPPET}`,
  },
];

const meta = {
  title: 'Basics/CodeSnippets/Tabs',
  component: Tabs,
  decorators: [
    (Story) => <div style={{ margin: '2rem' }}>{Story()}</div>,
    (Story) => <SyntaxHighlighterContextProvider>{Story()}</SyntaxHighlighterContextProvider>,
  ],
};

export default meta;

const Template = ({ renderLanguageSelector }) => (
  <Tabs.Root defaultValue={mockSnippets[0].key}>
    <Tabs.List aria-label="Alternative files for snippet">
      {mockSnippets.map(({ key, tabName }) => (
        <Tabs.Trigger key={key} value={key}>
          {tabName}
        </Tabs.Trigger>
      ))}
      {mockSnippets.map(({ content, key }) => (
        <Tabs.Content key={key} value={key}>
          <BaseCodeSnippet
            id={key}
            snippet={content}
            syntax="ts"
            title="Example.stories.ts"
            renderLanguageSelector={renderLanguageSelector}
          />
        </Tabs.Content>
      ))}
    </Tabs.List>
  </Tabs.Root>
);

export const Basic = Template.bind({});

export const WithLanguageSelector = Template.bind({});
WithLanguageSelector.args = {
  renderLanguageSelector: () => (
    <LanguageSelector
      items={languageSelectorMeta.args.items}
      value="TypeScript"
      onChange={() => {}}
    />
  ),
};
