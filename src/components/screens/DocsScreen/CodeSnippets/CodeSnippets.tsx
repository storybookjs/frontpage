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
import { PackageManagerSelector } from '../PackageManagerSelector';
import { useIfContext } from '../If';
import { Tabs } from './CodeSnippetsTabs';
import {
  SnippetObject,
  fetchDocsSnippets,
  getPackageManagerKeyFromPath,
  getSnippetType,
  isTerminalSnippetByPath,
} from './fetch-snippets.utils';

const COMMON = 'common';

// Only show CSF2 -> 3 message for versions prior to this one
const CSF2_MESSAGE_VERSION_THRESHOLD = 7.6;

export interface CodeSnippetProps {
  csf2Path?: string;
  currentCodeLanguage: string;
  currentPackageManager: string;
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

function isOnlyPackageManagerSnippets(paths) {
  return paths.every(isTerminalSnippetByPath);
}

type GetResolvedPaths = (
  paths: string[],
  context: {
    currentCodeLanguage: string;
    currentPackageManager: string;
    currentRenderer: string;
    defaultRenderer: string;
    ifContextRenderer?: string[];
    latestVersion: number;
    version: number;
  }
) => [string[], React.ReactNode];

export const getResolvedPaths: GetResolvedPaths = (
  paths,
  {
    currentCodeLanguage,
    currentPackageManager,
    currentRenderer,
    defaultRenderer,
    ifContextRenderer = [],
    latestVersion,
    version,
  }
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
    if (isOnlyPackageManagerSnippets(pathsForRelevantRenderer)) {
      pathsForRelevantRenderer = pathsForRelevantRenderer.filter(
        (path) => getPackageManagerKeyFromPath(path) === currentPackageManager
      );
    }

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

function getSelector(type, isTerminal): React.ReactNode {
  if (type === 'packageManager') return <PackageManagerSelector />;

  if (type === 'codeLanguage' && !isTerminal) return <CodeLanguageSelector />;

  return undefined;
}

const Snippet = ({
  currentCodeLanguage,
  currentRenderer,
  defaultRenderer,
  id,
  message,
  selectorType = 'codeLanguage',
  snippet: { content, isTerminal, syntax, title },
  withTabs = false,
}) => (
  <BaseCodeSnippet
    id={id}
    LanguageSelector={getSelector(selectorType, isTerminal)}
    Eyebrow={
      typeof message === 'function'
        ? message({ currentCodeLanguage, currentRenderer, defaultRenderer })
        : message
    }
    snippet={content}
    syntax={syntax}
    title={title}
    withTabs={withTabs}
  />
);

const SnippetTabs = ({ snippets, snippetProps }) => {
  return (
    <Tabs.Root defaultValue={snippets[0].id}>
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
  const [snippets, setSnippets] = React.useState<SnippetObject[]>([]);

  const { defaultRenderer, version, latestVersion } = useSiteMetadata();
  const ifContext = useIfContext();

  const [resolvedPaths, message] = React.useMemo(
    () =>
      getResolvedPaths(paths, {
        currentCodeLanguage,
        currentPackageManager,
        currentRenderer,
        defaultRenderer,
        ifContextRenderer: ifContext.renderer,
        latestVersion,
        version,
      }),
    [
      currentCodeLanguage,
      currentPackageManager,
      currentRenderer,
      defaultRenderer,
      ifContext.renderer,
      latestVersion,
      paths,
      version,
    ]
  );

  const appliedMessage =
    message ||
    (usesCsf3 && version < CSF2_MESSAGE_VERSION_THRESHOLD ? (
      <CSF2Example csf2Path={csf2Path} />
    ) : null);

  /**
   * For a path like `web-components/button-story-click-handler-args.js.mdx`,
   * capture the group `button-story-click-handler-args`
   */
  const snippetsId = `snippet-${paths[0].match(/^(?:\w+-*)+\/((?:\w+-*)+)/)[1]}`;

  React.useEffect(() => {
    async function getSnippets() {
      const fetched = await fetchDocsSnippets(resolvedPaths);
      setSnippets(fetched);
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

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => logSnippetInteraction(currentRenderer, paths[0])} {...rest}>
      {snippets.length > 1 ? (
        <SnippetTabs snippets={snippets} snippetProps={snippetProps} />
      ) : (
        <Snippet
          snippet={snippets[0]}
          selectorType={
            isOnlyPackageManagerSnippets(resolvedPaths) ? 'packageManager' : 'codeLanguage'
          }
          {...snippetProps}
        />
      )}
    </div>
  );
};
