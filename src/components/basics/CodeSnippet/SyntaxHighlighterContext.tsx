import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { getHighlighter, Lang, Highlighter } from 'shiki';

const SYNTAX_LANGUAGES = ['js', 'jsx', 'ts', 'tsx', 'vue', 'svelte', 'html', 'css', 'sh'] as const;
type SupportedLanguages = typeof SYNTAX_LANGUAGES[number];

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
      theme: 'github-light',
      langs: SYNTAX_LANGUAGES as unknown as Lang[],
      paths: { wasm: '/dist', themes: '/themes', languages: '/languages' },
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
