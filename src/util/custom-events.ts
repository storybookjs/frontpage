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
export function logSnippetInteraction(renderer, snippetPath) {
  const snippetType = extractSnippetPath(snippetPath);
  const props = { renderer, snippet_type: snippetType };

  if (typeof window !== 'undefined' && (window as any).gtag && snippetType) {
    (window as any).gtag('event', 'click_snippet', { ...props });
  }

  if (typeof window !== 'undefined' && (window as any).plausible && snippetType) {
    (window as any).plausible('click_snippet', { props });
  }
}
