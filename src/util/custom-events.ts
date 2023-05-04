/**
 * In: get-started/installation-command-section/angular.mdx
 * Out: get-started/installation-command-section
 *
 * In: common/init-command.npx.js.mdx
 * Out: common/init-command
 *
 * In: malformed-snippet.mdx
 * Out: null
 */
const SNIPPET_TYPE_REGEX = /(?:\w+-?)+\/(?:\w+-?)+/;

export function logSnippetInteraction(framework, snippetPath) {
  const snippetType = snippetPath.match(SNIPPET_TYPE_REGEX)?.[1];

  if (typeof window !== 'undefined' && (window as any).gtag && snippetType) {
    (window as any).gtag('event', 'click_snippet', { framework, snippet_type: snippetType });
  }
}
