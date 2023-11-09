import { parseSnippetContent } from './parse-snippet-content.utils';

const RELATIVE_PATH_TO_SNIPPETS = '../../../../content/docs/snippets';

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
  content: string;
  syntax: string;
  title: string;
  type: string;
  terminal?: boolean;
}

// Note: Written as a factory function to allow for injection of relative path to snippets
const createFetchSnippets =
  (relativePathToSnippets: string = RELATIVE_PATH_TO_SNIPPETS) =>
  async (paths: string[]): Promise<Array<SnippetObject | undefined>> => {
    return await Promise.all(
      paths.map(async (snippetPath: string) => {
        let ModuleComponent;
        try {
          ModuleComponent = (await import(`${relativePathToSnippets}/${snippetPath}`)).default;
        } catch {
          if (pathIs.ts_4_9(snippetPath)) {
            try {
              ModuleComponent = (
                await import(`${relativePathToSnippets}/${snippetPath.replace('.ts-4-9.', '.js.')}`)
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
        const terminal = isTerminalSnippet(snippetPath);
        const [title, content] = parseSnippetContent(ModuleComponent, terminal);

        return {
          id: snippetPath,
          content,
          syntax,
          title: terminal ? 'Terminal' : title,
          type,
          terminal,
        };
      })
    );
  };

export const fetchSnippets = createFetchSnippets();
