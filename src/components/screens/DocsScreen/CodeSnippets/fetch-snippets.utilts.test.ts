import {
  getSnippetType,
  getSnippetSyntax,
  isTerminalSnippetByType,
  fetchDocsSnippets,
} from './fetch-snippets.utils';

describe('UTILITIES: fetch-snippets.utils', () => {
  describe('UTIL: getSnippetType', () => {
    it('TYPE: It should return the correct snippet type', () => {
      expect(getSnippetType('some-snippet.ts.mdx')).toBe('ts');
      expect(getSnippetType('some-snippet.js.mdx')).toBe('js');
      expect(getSnippetType('some-snippet.ts.mdx')).toBe('ts');
      expect(getSnippetType('some-snippet.ts-2.mdx')).toBe('ts-2');
      expect(getSnippetType('some-snippet.js-2.mdx')).toBe('js-2');
      expect(getSnippetType('some-snippet.npx.ts.mdx')).toBe('npm');
      expect(getSnippetType('some-snippet.npm.ts.mdx')).toBe('npm');
      expect(getSnippetType('some-snippet.yarn.ts.mdx')).toBe('yarn');
      expect(getSnippetType('some-snippet.pnpm.ts.mdx')).toBe('pnpm');
      expect(getSnippetType('some-snippet.native-format.mdx')).toBe('native-format');
      expect(getSnippetType('some-snippet.whatever.ts.mdx')).toBe('ts');
    });
  });
  describe('UTIL: getSnippetSyntax', () => {
    it('SYNTAX: It should return the correct snippet syntax', () => {
      expect(getSnippetSyntax('js')).toBe('js');
      expect(getSnippetSyntax('js-2')).toBe('js');
      expect(getSnippetSyntax('ts')).toBe('ts');
      expect(getSnippetSyntax('ts-2')).toBe('ts');
      expect(getSnippetSyntax('npm')).toBe('sh');
      expect(getSnippetSyntax('npx')).toBe('sh');
      expect(getSnippetSyntax('pnpm')).toBe('sh');
      expect(getSnippetSyntax('yarn')).toBe('sh');
      expect(getSnippetSyntax('native-format')).toBe('html');
      expect(getSnippetSyntax('whatever')).toBe('whatever');
    });
  });
  describe('UTIL: isTerminalSnippetByType', () => {
    it('TERMINAL: It should determine terminal snippets by type', () => {
      expect(isTerminalSnippetByType('js')).toBe(false);
      expect(isTerminalSnippetByType('ts')).toBe(false);
      expect(isTerminalSnippetByType('npm')).toBe(true);
      expect(isTerminalSnippetByType('npx')).toBe(true);
      expect(isTerminalSnippetByType('pnpm')).toBe(true);
      expect(isTerminalSnippetByType('yarn')).toBe(true);
    });
  });
  describe('UTIL: fetchDocsSnippets', () => {});
});
