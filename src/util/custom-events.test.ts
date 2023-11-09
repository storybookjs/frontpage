import { extractSnippetPath } from './custom-events';

it('parses snippet type for install command', () => {
  const npxResult = extractSnippetPath('common/init-command.npx.js.mdx');
  expect(npxResult).toBe('init-command');

  const pnpmResult = extractSnippetPath('common/init-command.pnpm.js.mdx');
  expect(pnpmResult).toBe('init-command');
});

it('parses renderer specific snippets [react]', () => {
  const results = extractSnippetPath('react/button-story.js.mdx');
  expect(results).toBe('button-story');
});

it('parses renderer specific snippets [vue]', () => {
  const results = extractSnippetPath('vue/button-story-with-addon-example.js.mdx');
  expect(results).toBe('button-story-with-addon-example');
});

it('parses renderer specific snippets [angular]', () => {
  const results = extractSnippetPath('angular/button-story-with-addon-example.ts.mdx');
  expect(results).toBe('button-story-with-addon-example');
});

it('parses renderer specific snippets [web-components]', () => {
  const results = extractSnippetPath('web-components/button-story-with-addon-example.js.mdx');
  expect(results).toBe('button-story-with-addon-example');
});

it('parses renderer specific snippets [ts-4.9]', () => {
  const results = extractSnippetPath(
    'common/button-story-baseline-with-satisfies-story-level.ts-4-9.mdx'
  );
  expect(results).toBe('button-story-baseline-with-satisfies-story-level');
});

it('parses common snippets', () => {
  const results = extractSnippetPath('common/storybook-main-fallback-mdx.js.mdx');
  expect(results).toBe('storybook-main-fallback-mdx');
});

it('parses snippet path with three levels', () => {
  const results = extractSnippetPath('get-started/installation-problems/angular.mdx');
  expect(results).toBe('installation-problems');
});

it('returns null for malformed snippet paths', () => {
  const results = extractSnippetPath('malformed-snippet.mdx');
  expect(results).toBeNull();
});
