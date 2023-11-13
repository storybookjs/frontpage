import * as React from 'react';

import { DEFAULT_CODE_LANGUAGE } from '../../../constants/code-languages';
import { logSnippetInteraction } from '../../../util/custom-events';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { CodeLanguageSelector } from '../../screens/DocsScreen/CodeLanguageSelector';
import { useIfContext } from '../../screens/DocsScreen/If';
import { BaseCodeSnippet } from './BaseCodeSnippet';
import { Tabs } from './CodeSnippetsTabs';
import { fetchDocsSnippets } from './utils/fetch-snippets.utils';

const COMMON = 'common';

export interface CodeSnippetProps {
  csf2Path?: string;
  currentCodeLanguage: string;
  currentRenderer: string;
  paths: string[];
  usesCsf3?: boolean;
}

function getPathsForLanguage(paths, forLanguage, { matchMDX = true } = {}) {
  return paths.filter((path) => {
    /**
     * For a path like `web-components/button-story-click-handler-args.js.mdx`,
     * capture the group `js`
     */
    const language = path.match(/\.((?:\w+-*)+)\.mdx$/)[1];

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

  const isPackageManagerSnippet = paths.some(
    (path) => path.includes('.npm.') || path.includes('.yarn.')
  );

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
    message = <></>;
    // message = <MissingRendererMessage currentRenderer={currentRenderer} />;
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
      message = <></>;
      // message = (
      //   <MissingCodeLanguageMessage
      //     currentCodeLanguage={currentCodeLanguage}
      //     currentRenderer={currentRenderer}
      //   />
      // );
    }
  }

  // JS selected, but no JS snippet, fallback to TS
  if (resolvedPaths.length === 0) {
    resolvedPaths = getPathsForLanguage(pathsForRelevantRenderer, DEFAULT_CODE_LANGUAGE);
    // If there are any JS snippets for other renderers, show a message
    if (getPathsForLanguage(paths, 'js', { matchMDX: false }).length > 0) {
      message = <></>;
      // message = (
      //   <MissingCodeLanguageMessage
      //     currentCodeLanguage={currentCodeLanguage}
      //     currentRenderer={currentRenderer}
      //     fallbackLanguage="ts"
      //   />
      // );
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

const Snippet = ({ id, message, snippet }) => (
  <BaseCodeSnippet
    id={id}
    renderLanguageSelector={() => <CodeLanguageSelector />}
    renderSnippetEyebrow={() => message}
    snippet={snippet.content}
    {...snippet}
  />
);

export const CodeSnippets = ({
  csf2Path,
  currentCodeLanguage,
  currentRenderer,
  paths,
  usesCsf3,
  ...rest
}: CodeSnippetProps) => {
  const [snippets, setSnippets] = React.useState([]);

  const { defaultRenderer, version, latestVersion } = useSiteMetadata();
  const ifContext = useIfContext();

  const [resolvedPaths, message] = getResolvedPaths(
    paths,
    defaultRenderer,
    currentRenderer,
    currentCodeLanguage,
    version,
    latestVersion,
    ifContext.renderer
  );

  /**
   * For a path like `web-components/button-story-click-handler-args.js.mdx`,
   * capture the group `button-story-click-handler-args`
   */
  const id = `snippet-${paths[0].match(/^(?:\w+-*)+\/((?:\w+-*)+)/)[1]}`;

  React.useEffect(() => {
    async function getSnippets() {
      const fetched = await fetchDocsSnippets(resolvedPaths);
      setSnippets(fetched.filter((snippet) => snippet != null));
    }

    getSnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRenderer]);

  if (!snippets.length) return null;

  let content = <Snippet id={id} message={message} snippet={snippets[0]} />;

  if (snippets.length > 1) {
    const keyedSnippets = snippets.map((snippet, index) => ({
      ...snippet,
      index: index.toString(),
      key: `${index}-${snippet.tabName}`,
    }));
    content = (
      <Tabs.Root>
        <Tabs.List aria-label="Alternative files for snippet">
          {keyedSnippets.map(({ index, key, tabName }) => (
            <Tabs.Trigger key={key} value={index}>
              {tabName}
            </Tabs.Trigger>
          ))}
          {keyedSnippets.map(({ index, key }) => (
            <Tabs.Content key={key} value={index}>
              <Snippet id={id} message={message} snippet={snippets[index]} />
            </Tabs.Content>
          ))}
        </Tabs.List>
      </Tabs.Root>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => logSnippetInteraction(currentRenderer, paths[0])} {...rest}>
      {content}
    </div>
  );
};
