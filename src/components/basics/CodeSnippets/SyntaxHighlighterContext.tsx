import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { getHighlighter, Lang, Highlighter } from 'shiki';

import firefoxTheme from './themes/firefox-theme-vscode';

const SYNTAX_LANGUAGES = [
  'bash',
  'css',
  'html',
  'javascript',
  'js',
  'json',
  'jsx',
  'md',
  'mdx',
  'sh',
  'shell',
  'svelte',
  'ts',
  'vue',
] as const;
export type SupportedLanguages = typeof SYNTAX_LANGUAGES[number];

export interface SyntaxHighlighterContextValue {
  isLoadingHighlighter: boolean;
  generateSnippetHTML: (code: string, lang: SupportedLanguages) => string;
}

const SyntaxHighlighterContext = createContext<SyntaxHighlighterContextValue>({
  isLoadingHighlighter: true,
  generateSnippetHTML: (code: string, lang: SupportedLanguages) => '',
});

export const SyntaxHighlighterContextProvider: React.FC = ({ children }) => {
  const [isLoadingHighlighter, setIsLoadingHighlighter] = useState(true);
  const [highlighterInstance, setHighlighterInstance] = useState<Highlighter | undefined>();

  const generateSnippetHTML = useMemo(
    () =>
      typeof highlighterInstance !== undefined
        ? (code: string, lang: SupportedLanguages) => highlighterInstance.codeToHtml(code, { lang })
        : () => '',
    [highlighterInstance]
  );

  useEffect(() => {
    getHighlighter({
      // @ts-expect-error - shiki types seem to be incorrect
      theme: firefoxTheme,
      langs: SYNTAX_LANGUAGES as unknown as Lang[],
      paths: { wasm: '/shiki/dist', themes: '/shiki/themes', languages: '/shiki/languages' },
    }).then((highlighter) => {
      setHighlighterInstance(highlighter);
      setIsLoadingHighlighter(false);
    });
  }, []);

  return (
    <SyntaxHighlighterContext.Provider
      value={{
        isLoadingHighlighter,
        generateSnippetHTML,
      }}
    >
      {children}
    </SyntaxHighlighterContext.Provider>
  );
};

export const useSyntaxHighlighter = () => useContext(SyntaxHighlighterContext);
