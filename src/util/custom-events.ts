export function logSnippetInteraction(framework, snippetPath) {
  const [, snippetType] = snippetPath.split('/');

  if (typeof window !== 'undefined' && (window as any).gtag && snippetType) {
    (window as any).gtag('event', 'click_snippet', { framework, snippet_type: snippetType });
  }
}
