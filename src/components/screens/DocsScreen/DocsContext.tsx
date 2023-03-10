import * as React from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { DEFAULT_CODE_LANGUAGE, CODE_LANGUAGES } from '../../../constants/code-languages';

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

export function DocsContextProvider({ children, framework }) {
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

  const [
    /**
     * We provide `framework`, which comes from props (which comes from the page
     * context), and not `lsFramework`, which is from localStorage.
     * We only use this value to check if it's valid and coerce to the default, if not.
     */
    lsFramework,
    setFramework,
  ] = useLocalStorage<Framework>(LS_SELECTED_FRAMEWORK_KEY, framework);

  React.useLayoutEffect(() => {
    if (!frameworks.includes(lsFramework)) {
      // Invalid framework in localStorage
      setFramework(defaultFramework);
    }
  }, [lsFramework, setFramework]);

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
