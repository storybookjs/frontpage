import * as React from 'react';
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';

import { DEFAULT_CODE_LANGUAGE, CODE_LANGUAGES } from '../../../constants/code-languages';
import { SEARCH_PARAMS_KEYS } from '../../../constants/search-params';
import {
  DEFAULT_PACKAGE_MANAGER,
  PACKAGE_MANAGERS,
  PackageManagerKey,
} from '../../../constants/package-managers';

const siteMetadata = require('../../../../site-metadata');

const { allRenderers, coreRenderers, communityRenderers, defaultRenderer } = siteMetadata;

// This still uses "framework" in the value for historical reasons
export const LS_SELECTED_RENDERER_KEY = 'sb-docs-selected-framework';

export const LS_SELECTED_CODE_LANGUAGE_KEY = 'sb-docs-selected-code-language';

export const LS_SELECTED_PACKAGE_MANAGER_KEY = 'sb-docs-selected-package-manager';

type CodeLanguage = keyof typeof CODE_LANGUAGES;
type Renderer = typeof allRenderers[number];

type TDocsContext = {
  codeLanguage: [CodeLanguage, React.Dispatch<React.SetStateAction<CodeLanguage>>];
  packageManager: [PackageManagerKey, React.Dispatch<React.SetStateAction<PackageManagerKey>>];
  renderer: [Renderer, React.Dispatch<React.SetStateAction<Renderer>>];
};

const DocsContext = React.createContext<TDocsContext>({
  codeLanguage: [DEFAULT_CODE_LANGUAGE, () => {}],
  packageManager: [DEFAULT_PACKAGE_MANAGER, () => {}],
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

  const [packageManager, setPackageManager] = useLocalStorage<PackageManagerKey>(
    LS_SELECTED_PACKAGE_MANAGER_KEY,
    DEFAULT_PACKAGE_MANAGER
  );

  const [renderer, setRenderer] = useSessionStorage<Renderer>(
    LS_SELECTED_RENDERER_KEY,
    defaultRenderer
  );

  React.useLayoutEffect(() => {
    // Angular and Web components snippets are not available in TS-4-9, so we want to coerce to TS
    if (['angular', 'web-components'].includes(renderer) && codeLanguage === 'ts-4-9')
      setCodeLanguage('ts');

    // Invalid code language in localStorage
    if (!Object.keys(CODE_LANGUAGES).includes(codeLanguage)) {
      setCodeLanguage(DEFAULT_CODE_LANGUAGE);
    }
  }, [codeLanguage, setCodeLanguage, renderer]);

  // Handle package manager
  React.useLayoutEffect(() => {
    // Invalid package manager in localStorage
    if (!Object.keys(PACKAGE_MANAGERS).includes(packageManager)) {
      setPackageManager(DEFAULT_PACKAGE_MANAGER);
    }
  }, [packageManager, setPackageManager]);

  React.useLayoutEffect(() => {
    let forcedRenderer = rendererProp;
    if (isBrowser) {
      const url = new URL(window.location.href);
      const rendererParam = url.searchParams.get(SEARCH_PARAMS_KEYS.RENDERER);
      if (rendererParam) forcedRenderer = rendererParam;

      // Remove search param from URL, to allow selecting a different renderer
      url.searchParams.delete(SEARCH_PARAMS_KEYS.RENDERER);
      window.history.replaceState({}, '', url.toString());
    }

    if (forcedRenderer && forcedRenderer !== renderer) {
      setRenderer(forcedRenderer);
    }

    // Invalid renderer in localStorage
    if (!allRenderers.includes(renderer)) {
      setRenderer(defaultRenderer);
    }
  }, [renderer, rendererProp, setRenderer]);

  return (
    <DocsContext.Provider
      value={{
        codeLanguage: [
          // Angular snippets are not available in JS, so we want to swap JS to TS
          renderer === 'angular' && codeLanguage === 'js' ? 'ts' : codeLanguage,
          setCodeLanguage,
        ],
        packageManager: [packageManager, setPackageManager],
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
