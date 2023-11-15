import * as React from 'react';
import { startCase } from 'lodash';

import { MissingCodeLanguage } from '../../../basics/CodeSnippets/BaseCodeSnippet/SnippetEyebrows';
import { parseSnippetContent } from '../../../basics/CodeSnippets/utils/parse-snippet-content.utils';

/**
 * For a path like `web-components/button-story-click-handler-args.js.mdx`,
 * return `web-components`
 */
const getSnippetRenderer = (path: string) => path.split('/')[0];

/**
 * For a path like `web-components/button-story-click-handler-args.js.mdx`,
 * capture the group `js`
 */
export const getSnippetType = (path: string) => path.match(/\.((?:\w+-*)+)\.mdx$/)[1];

const syntaxMap = {
  'ts-4-9': 'ts',
  npm: 'sh',
  pnpm: 'sh',
  yarn: 'sh',
};

export const getSnippetSyntax = (type: string) => {
  if (syntaxMap[type]) return syntaxMap[type];

  // Matching `ts-2`, `ts-3`, etc.
  if (type.startsWith('js')) return 'js';
  if (type.startsWith('ts')) return 'ts';

  return type;
};

const nameMap = {
  'stories-of': 'StoriesOf()',
  'ts-4-9': 'TS 4.9',
};

const prettifyName = (name) => {
  if (nameMap[name]) return nameMap[name];
  return startCase(name.replace(/-/g, ' '));
};

const getSnippetTabName = (path: string) => {
  const name = path.split('.')[1];
  return prettifyName(name);
};

export const isTerminalSnippet = (type: string) => syntaxMap[type] === 'sh';

export interface SnippetObject {
  content: string;
  id: string;
  message?: React.ReactNode;
  renderer: string;
  syntax: string;
  tabName: string;
  title: string;
  type: string;
}

export const fetchDocsSnippets = async (
  paths: string[]
): Promise<Array<SnippetObject | undefined>> => {
  return await Promise.all(
    paths.map(async (snippetPath: string) => {
      const renderer = getSnippetRenderer(snippetPath);
      const type = getSnippetType(snippetPath);
      const isTerminal = isTerminalSnippet(type);

      let ModuleComponent;
      let message;
      try {
        /**
         * Important: The hard-coded base path MUST be at the beginning of the import
         * (it cannot be a variable) because Webpack needs to know which snippet files
         * are available to import.
         * See: https://github.com/webpack/webpack/issues/6680#issuecomment-370800037
         */
        ModuleComponent = (await import(`../../../../content/docs/snippets/${snippetPath}`))
          .default;
      } catch {
        // If path is a TS 4.9 snippet and errors, try to load the TS snippet
        if (type === 'ts-4-9') {
          try {
            ModuleComponent = (
              await import(
                `../../../../content/docs/snippets/${snippetPath.replace('.ts-4-9.', '.ts.')}`
              )
            ).default;

            message = ({ currentCodeLanguage }) => (
              <MissingCodeLanguage
                currentCodeLanguage={currentCodeLanguage}
                fallbackLanguage="ts"
              />
            );
          } catch {
            // No Typescript snippet exists for this path
            // TODO: consider logging this somewhere so the team can fix it
            return null;
          }
        }

        // If path doesn't exist, don't show the snippet
        // TODO: consider logging this somewhere so the team can fix it
        return null;
      }

      const [title, content] = parseSnippetContent(
        /**
         * 1. ModuleComponent is (due to MDX) a React component.
         * 2. That component renders a <pre> tag with a <code> tag inside.
         * 3. The <code> tag contains the actual code snippet string.
         */
        ModuleComponent({ components: {} }).props.children.props.children.props.children,
        isTerminal
      );

      return {
        content,
        id: snippetPath,
        message,
        renderer,
        syntax: getSnippetSyntax(type),
        tabName: getSnippetTabName(snippetPath),
        title,
        type,
      };
    })
  );
};
