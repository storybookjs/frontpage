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
      expect(getSnippetType('some-snippet.whatever.ts.mdx')).toBe('ts');
    });
  });
  describe('UTIL: getSnippetSyntax', () => {});
  describe('UTIL: isTerminalSnippetBySyntax', () => {});
  describe('UTIL: fetchDocsSnippets', () => {});
});
