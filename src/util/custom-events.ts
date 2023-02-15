export function logSnippetInteraction(framework, snippetType) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'click_snippet', { framework, snippet_type: snippetType });
  }
}
