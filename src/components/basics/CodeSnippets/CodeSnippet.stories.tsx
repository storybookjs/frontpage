import React from 'react';
import { CodeSnippet } from './CodeSnippet';
import { SyntaxHighlighterContextProvider } from './SyntaxHighlighterContext';

const meta = {
  title: 'Basics/CodeSnippets/FromMDXSnippets',
  component: CodeSnippet,
  decorators: [
    (Story) => <div style={{ margin: '2rem' }}>{Story()}</div>,
    (Story) => <SyntaxHighlighterContextProvider>{Story()}</SyntaxHighlighterContextProvider>,
  ],
};

export default meta;

export const Basic = {};
