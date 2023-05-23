export function extractSnippetPath(snippetPath: string) {
  const [, snippetType] = snippetPath.split('/');
  if (!snippetType) {
    return null;
  }
  const snippetTypeWithoutExtension = snippetType.replace(/\..+$/, '');

  return snippetTypeWithoutExtension;
}

/**
 * In: get-started/installation-command-section/angular.mdx
 * Out: installation-command-section
 *
 * In: common/init-command.npx.js.mdx
 * Out: init-command
 *
 * In: malformed-snippet.mdx
 * Out: null
 */
export function logSnippetInteraction(framework, snippetPath) {
  const snippetType = extractSnippetPath(snippetPath);

  if (typeof window !== 'undefined' && (window as any).gtag && snippetType) {
    (window as any).gtag('event', 'click_snippet', { framework, snippet_type: snippetType });
  }
}
