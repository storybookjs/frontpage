import { parseSnippetContent } from './parse-snippet-content.utils';

export const pathIs = {
  ts_4_9: (path: string) => path.includes('.ts-4-9.'),
  ts: (path: string) => path.includes('.ts.') && !path.includes('.ts-4-9.'),
  js: (path: string) => path.includes('.js.'),
  npm: (path: string) => path.includes('.npm.'),
  pnpm: (path: string) => path.includes('.pnpm.'),
  yarn: (path: string) => path.includes('.yarn.'),
};

export const getSnippetSyntax = (path: string) => {
  if (pathIs.ts_4_9(path)) return 'ts';
  if (pathIs.ts(path)) return 'ts';
  if (pathIs.js(path)) return 'js';
  if (pathIs.npm(path)) return 'sh';
  if (pathIs.pnpm(path)) return 'sh';
  if (pathIs.yarn(path)) return 'sh';
  return '???';
};

export const getSnippetType = (path: string) => {
  if (pathIs.ts_4_9(path)) return 'ts-4-9';
  if (pathIs.ts(path)) return 'ts';
  if (pathIs.js(path)) return 'js';
  if (pathIs.npm(path)) return 'npm';
  if (pathIs.pnpm(path)) return 'pnpm';
  if (pathIs.yarn(path)) return 'yarn';
  return '???';
};

export const isTerminalSnippet = (path: string) =>
  pathIs.npm(path) || pathIs.pnpm(path) || pathIs.yarn(path);

export interface SnippetObject {
  id: string;
  isTerminal?: boolean;
  content: string;
  renderer: string;
  syntax: string;
  title: string;
  type: string;
}

export const fetchDocsSnippets = async (
  paths: string[]
): Promise<Array<SnippetObject | undefined>> => {
  return await Promise.all(
    paths.map(async (snippetPath: string) => {
      const [renderer] = snippetPath.split('/');

      let ModuleComponent;
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
        if (pathIs.ts_4_9(snippetPath)) {
          try {
            ModuleComponent = (
              await import(
                `../../../../content/docs/snippets/${snippetPath.replace('.ts-4-9.', '.ts.')}`
              )
            ).default;
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

      const syntax = getSnippetSyntax(snippetPath);
      const type = getSnippetType(snippetPath);
      const isTerminal = isTerminalSnippet(snippetPath);

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
        id: snippetPath,
        isTerminal,
        content,
        renderer,
        syntax,
        title: isTerminal ? 'Terminal' : title,
        type,
      };
    })
  );
};
