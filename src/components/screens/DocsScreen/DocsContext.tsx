import * as React from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { DEFAULT_CODE_LANGUAGE, CODE_LANGUAGES } from '../../../constants/code-languages';
import { SEARCH_PARAMS_KEYS } from '../../../constants/search-params';

const siteMetadata = require('../../../../site-metadata');

const { coreFrameworks, communityFrameworks, defaultFramework } = siteMetadata;

const frameworks = [...coreFrameworks, ...communityFrameworks];

export const LS_SELECTED_FRAMEWORK_KEY = 'sb-docs-selected-framework';

export const LS_SELECTED_CODE_LANGUAGE_KEY = 'sb-docs-selected-code-language';

type CodeLanguage = keyof typeof CODE_LANGUAGES;
type Framework = typeof frameworks[number];

type TDocsContext = {
  codeLanguage: [CodeLanguage, React.Dispatch<React.SetStateAction<CodeLanguage>>];
  framework: [Framework, React.Dispatch<React.SetStateAction<Framework>>];
};

const DocsContext = React.createContext<TDocsContext>({
  codeLanguage: [DEFAULT_CODE_LANGUAGE, () => {}],
  framework: [defaultFramework, () => {}],
});

const isBrowser = typeof window !== 'undefined';

type DocsContextProviderProps = {
  children: React.ReactNode;
  framework?: Framework;
};

export function DocsContextProvider({
  children,
  framework: frameworkProp,
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

  const [framework, setFramework] = useLocalStorage<Framework>(
    LS_SELECTED_FRAMEWORK_KEY,
    defaultFramework
  );

  React.useLayoutEffect(() => {
    let forcedFramework = frameworkProp;
    if (isBrowser) {
      const url = new URL(window.location.href);
      forcedFramework = url.searchParams.get(SEARCH_PARAMS_KEYS.RENDERER);

      // Remove search param from URL, to allow selecting a different renderer
      url.searchParams.delete(SEARCH_PARAMS_KEYS.RENDERER);
      window.history.replaceState({}, '', url.toString());
    }

    if (forcedFramework && forcedFramework !== framework) setFramework(forcedFramework);

    // Invalid framework in localStorage
    if (!frameworks.includes(framework)) setFramework(defaultFramework);
  }, [framework, frameworkProp, setFramework]);

  return (
    <DocsContext.Provider
      value={{
        codeLanguage: [
          // Angular snippets are not available in JS, so we want to swap JS to TS
          framework === 'angular' && codeLanguage === 'js' ? 'ts' : codeLanguage,
          setCodeLanguage,
        ],
        framework: [framework, setFramework],
      }}
    >
      {children}
    </DocsContext.Provider>
  );
}

export function useDocsContext() {
  return React.useContext(DocsContext);
}
