import * as React from 'react';

import { DEFAULT_CODE_LANGUAGE } from '../../../../constants/code-languages';
import { logSnippetInteraction } from '../../../../util/custom-events';
import { BaseCodeSnippet } from '../../../basics/CodeSnippets/BaseCodeSnippet';
import {
  CSF2Example,
  MissingCodeLanguage,
  MissingRenderer,
} from '../../../basics/CodeSnippets/BaseCodeSnippet/SnippetEyebrows';
import useSiteMetadata from '../../../lib/useSiteMetadata';
import { CodeLanguageSelector } from '../CodeLanguageSelector';
import { useIfContext } from '../If';
import { Tabs } from './CodeSnippetsTabs';
import {
  fetchDocsSnippets,
  getPackageManagerKeyFromPath,
  getSnippetType,
  isTerminalSnippetByPath,
} from './fetch-snippets.utils';
import { useDocsContext } from '../DocsContext';

const COMMON = 'common';

export interface CodeSnippetProps {
  csf2Path?: string;
  currentCodeLanguage: string;
  currentPackageManager?: string;
  currentRenderer: string;
  paths: string[];
  usesCsf3?: boolean;
}

function getPathsForLanguage(paths, forLanguage, { matchMDX = true } = {}) {
  return paths.filter((path) => {
    const language = getSnippetType(path);

    return (
      /**
       * The language can be, among others:
       * - `js` for general JS
       * - `ts` for general TS
       * - `ts-2` or `ts-3` for Vue 2/3 TS
       * - `ts-4-9` for TS 4.9
       * - `mdx` for MDX
       * - `mdx-2` or `mdx-3` for Vue 2/3 MDX
       * This check is formulated so that `ts-4-9` does not match `ts`, but, e.g., `ts-2` does
       */
      (language === 'ts-4-9' ? language === forLanguage : language.startsWith(forLanguage)) ||
      // Also optionally match any mdx language snippet paths
      (matchMDX && language.startsWith('mdx'))
    );
  });
}

type GetResolvedPaths = (
  paths: string[],
  defaultRenderer: string,
  currentRenderer: string,
  currentCodeLanguage: string,
  version: number,
  latestVersion: number,
  ifContextRenderer?: string[]
) => [string[], React.ReactNode];

export const getResolvedPaths: GetResolvedPaths = (
  paths,
  defaultRenderer,
  currentRenderer,
  currentCodeLanguage,
  version,
  latestVersion,
  ifContextRenderer = []
) => {
  let message;

  const isPackageManagerSnippet = paths.some(isTerminalSnippetByPath);

  let completePaths = paths;
  if (version >= 7 && !isPackageManagerSnippet) {
    // add TS 4.9 snippets
    completePaths = paths.flatMap((path) =>
      path.includes('.ts.') ? [path, path.replace('.ts.', '.ts-4-9.')] : [path]
    );
  }

  const pathsByRenderer = completePaths.reduce((acc, path) => {
    const [renderer] = path.split('/');
    if (!acc[renderer]) acc[renderer] = [];
    acc[renderer].push(path);
    return acc;
  }, {} as Record<string, string[]>);

  let pathsForRelevantRenderer = pathsByRenderer[currentRenderer] || pathsByRenderer[COMMON] || [];

  if (pathsForRelevantRenderer.length === 0) {
    /*
     * CodeSnippets can be rendered inside an If block. When building the page, that If block renders
     * its contents regardless of the current renderer, which can result in no relevant paths being
     * found. In that case, we attempt to find paths for the renderers configured for the parent If
     * block. This would never happen in the browser, because the If block filters its contents. But
     * it's necessary to prevent throwing an error during the build.
     */
    const rendererWithPaths = ifContextRenderer
      .filter((r) => r !== currentRenderer)
      .find((r) => pathsByRenderer[r]);
    if (rendererWithPaths) {
      pathsForRelevantRenderer = pathsByRenderer[rendererWithPaths];
    }
  }

  if (isPackageManagerSnippet) {
    return [pathsForRelevantRenderer, message];
  }

  if (pathsForRelevantRenderer.length === 0) {
    pathsForRelevantRenderer = pathsByRenderer[defaultRenderer];
    message = (
      <MissingRenderer currentRenderer={currentRenderer} defaultRenderer={defaultRenderer} />
    );
  }

  if (!pathsForRelevantRenderer) {
    if (version >= latestVersion) {
      throw new Error(
        `No snippets found for ${currentRenderer}${
          ifContextRenderer.length > 0 ? `or ${ifContextRenderer.join(' or ')}` : ''
        } in ${paths.join(', ')}`
      );
    }
    return [[], message];
  }

  let resolvedPaths = getPathsForLanguage(pathsForRelevantRenderer, currentCodeLanguage);

  // TODO: split below into own function?

  // TS selected, but no TS snippet, fallback to JS
  if (resolvedPaths.length === 0) {
    resolvedPaths = getPathsForLanguage(pathsForRelevantRenderer, 'js');
    // If there are any TS snippets for other renderers, show a message
    if (getPathsForLanguage(paths, 'ts', { matchMDX: false }).length > 0) {
      message = <MissingCodeLanguage currentCodeLanguage={currentCodeLanguage} />;
    }
  }

  // JS selected, but no JS snippet, fallback to TS
  if (resolvedPaths.length === 0) {
    resolvedPaths = getPathsForLanguage(pathsForRelevantRenderer, DEFAULT_CODE_LANGUAGE);
    // If there are any JS snippets for other renderers, show a message
    if (getPathsForLanguage(paths, 'js', { matchMDX: false }).length > 0) {
      message = (
        <MissingCodeLanguage currentCodeLanguage={currentCodeLanguage} fallbackLanguage="ts" />
      );
    }
  }

  // JS or TS selected, but no JS or TS snippet, fallback to anything available
  if (resolvedPaths.length === 0) {
    resolvedPaths = pathsForRelevantRenderer;
    message = undefined;
  }

  if (resolvedPaths.length === 0) {
    if (version >= latestVersion) {
      throw new Error(
        // prettier-ignore
        `No snippets found for ${currentRenderer} and ${currentCodeLanguage} in ${paths.join(', ')}`
      );
    }
    return [[], message];
  }

  return [resolvedPaths, message];
};

const Snippet = ({
  currentCodeLanguage,
  currentRenderer,
  defaultRenderer,
  id,
  message,
  snippet: { content, syntax, title },
  withTabs = false,
}) => (
  <BaseCodeSnippet
    id={id}
    LanguageSelector={<CodeLanguageSelector />}
    Eyebrow={
      typeof message === 'function'
        ? message({ currentCodeLanguage, currentRenderer, defaultRenderer })
        : () => message
    }
    snippet={content}
    syntax={syntax}
    title={title}
    withTabs={withTabs}
  />
);

const SnippetTabs = ({ defaultValue, snippets, snippetProps }) => {
  const {
    packageManager: [, setPackageManager],
  } = useDocsContext();

  function handleValueChange(value) {
    const key = getPackageManagerKeyFromPath(value);
    if (key) setPackageManager(key);
  }

  return (
    <Tabs.Root defaultValue={defaultValue} onValueChange={handleValueChange}>
      <Tabs.List aria-label="Alternative files for snippet">
        {snippets.map(({ id, tabName }) => (
          <Tabs.Trigger key={id} value={id}>
            {tabName}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {snippets.map(({ id }) => (
        <Tabs.Content key={id} value={id}>
          <Snippet
            {...snippetProps}
            snippet={snippets.find((snippet) => snippet.id === id)}
            withTabs
          />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export const CodeSnippets = ({
  csf2Path,
  currentCodeLanguage,
  currentPackageManager,
  currentRenderer,
  paths,
  usesCsf3,
  ...rest
}: CodeSnippetProps) => {
  const [snippets, setSnippets] = React.useState([]);

  const { defaultRenderer, version, latestVersion } = useSiteMetadata();
  const ifContext = useIfContext();

  const [resolvedPaths, message] = React.useMemo(
    () =>
      getResolvedPaths(
        paths,
        defaultRenderer,
        currentRenderer,
        currentCodeLanguage,
        version,
        latestVersion,
        ifContext.renderer
      ),
    [
      currentCodeLanguage,
      currentRenderer,
      defaultRenderer,
      ifContext.renderer,
      latestVersion,
      paths,
      version,
    ]
  );

  const appliedMessage = message || (usesCsf3 ? <CSF2Example csf2Path={csf2Path} /> : null);

  /**
   * For a path like `web-components/button-story-click-handler-args.js.mdx`,
   * capture the group `button-story-click-handler-args`
   */
  const snippetsId = `snippet-${paths[0].match(/^(?:\w+-*)+\/((?:\w+-*)+)/)[1]}`;

  React.useEffect(() => {
    async function getSnippets() {
      const fetched = await fetchDocsSnippets(resolvedPaths);
      setSnippets(fetched.filter((snippet) => snippet != null));
    }

    getSnippets();
  }, [resolvedPaths]);

  if (!snippets.length) return null;

  const snippetProps = {
    currentCodeLanguage,
    currentRenderer,
    defaultRenderer,
    id: snippetsId,
    message: appliedMessage,
  };

  const isOnlyPackageManagerSnippets = resolvedPaths.every(isTerminalSnippetByPath);
  const defaultTab = isOnlyPackageManagerSnippets
    ? snippets.find((snippet) => snippet.type === currentPackageManager)?.id
    : snippets[0].id;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => logSnippetInteraction(currentRenderer, paths[0])} {...rest}>
      {snippets.length > 1 ? (
        <SnippetTabs defaultValue={defaultTab} snippets={snippets} snippetProps={snippetProps} />
      ) : (
        <Snippet snippet={snippets[0]} {...snippetProps} />
      )}
    </div>
  );
};
