import * as React from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { DEFAULT_CODE_LANGUAGE, CODE_LANGUAGES } from '../../../constants/code-languages';
import { SEARCH_PARAMS_KEYS } from '../../../constants/search-params';

const siteMetadata = require('../../../../site-metadata');

const { allRenderers, coreRenderers, communityRenderers, defaultRenderer } = siteMetadata;

// This still uses "framework" in the value for historical reasons
export const LS_SELECTED_RENDERER_KEY = 'sb-docs-selected-framework';

export const LS_SELECTED_CODE_LANGUAGE_KEY = 'sb-docs-selected-code-language';

type CodeLanguage = keyof typeof CODE_LANGUAGES;
type Renderer = typeof allRenderers[number];

type TDocsContext = {
  codeLanguage: [CodeLanguage, React.Dispatch<React.SetStateAction<CodeLanguage>>];
  renderer: [Renderer, React.Dispatch<React.SetStateAction<Renderer>>];
};

const DocsContext = React.createContext<TDocsContext>({
  codeLanguage: [DEFAULT_CODE_LANGUAGE, () => {}],
  renderer: [defaultRenderer, () => {}],
});

const isBrowser = typeof window !== 'undefined';

type DocsContextProviderProps = {
  children: React.ReactNode;
  renderer?: Renderer;
};

export function DocsContextProvider({
  children,
  renderer: rendererProp,
}: DocsContextProviderProps) {
  const [codeLanguage, setCodeLanguage] = useLocalStorage<CodeLanguage>(
    LS_SELECTED_CODE_LANGUAGE_KEY,
    DEFAULT_CODE_LANGUAGE
  );

  React.useLayoutEffect(() => {
    if (!Object.keys(CODE_LANGUAGES).includes(codeLanguage)) {
      // Invalid code language in localStorage
      setCodeLanguage(DEFAULT_CODE_LANGUAGE);
    }
  }, [codeLanguage, setCodeLanguage]);

  const [renderer, setRenderer] = useLocalStorage<Renderer>(
    LS_SELECTED_RENDERER_KEY,
    defaultRenderer
  );

  React.useLayoutEffect(() => {
    let forcedRenderer = rendererProp;
    if (isBrowser) {
      const url = new URL(window.location.href);
      forcedRenderer = url.searchParams.get(SEARCH_PARAMS_KEYS.RENDERER);

      // Remove search param from URL, to allow selecting a different renderer
      url.searchParams.delete(SEARCH_PARAMS_KEYS.RENDERER);
      window.history.replaceState({}, '', url.toString());
    }

    if (forcedRenderer && forcedRenderer !== renderer) setRenderer(forcedRenderer);

    // Invalid renderer in localStorage
    if (!allRenderers.includes(renderer)) setRenderer(defaultRenderer);
  }, [renderer, rendererProp, setRenderer]);

  return (
    <DocsContext.Provider
      value={{
        codeLanguage: [
          // Angular snippets are not available in JS, so we want to swap JS to TS
          renderer === 'angular' && codeLanguage === 'js' ? 'ts' : codeLanguage,
          setCodeLanguage,
        ],
        renderer: [renderer, setRenderer],
      }}
    >
      {children}
    </DocsContext.Provider>
  );
}

export function useDocsContext() {
  return React.useContext(DocsContext);
}
