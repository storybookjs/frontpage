import * as React from 'react';

import { SyntaxHighlighterContextProvider } from '../../../basics/CodeSnippets/SyntaxHighlighterContext';
import { BaseCodeSnippet } from '../../../basics/CodeSnippets/BaseCodeSnippet/BaseCodeSnippet';
import { LanguageSelector } from '../../../basics/LanguageSelector';
import { Tabs } from './CodeSnippetsTabs';

import languageSelectorMeta from '../../../basics/LanguageSelector/LanguageSelector.stories';
import TS_SNIPPET from '../../../basics/CodeSnippets/utils/fixtures/string-snippets/example-stories';

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
    </Tabs.List>
    {mockSnippets.map(({ content, key }) => (
      <Tabs.Content key={key} value={key}>
        <BaseCodeSnippet
          id={key}
          snippet={content}
          syntax="ts"
          title="Example.stories.ts"
          LanguageSelector={LanguageSelector}
          withTabs
        />
      </Tabs.Content>
    ))}
  </Tabs.Root>
);

export const Basic = Template.bind({});

export const WithLanguageSelector = Template.bind({});
WithLanguageSelector.args = {
  LanguageSelector: (
    <LanguageSelector
      items={languageSelectorMeta.args.items}
      value="TypeScript"
      onChange={() => {}}
    />
  ),
};
