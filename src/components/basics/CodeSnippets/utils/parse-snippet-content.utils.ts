const TrimSnippet = (snippet: string[]) => {
  let topTrimmed = false;
  while (!topTrimmed) {
    if (snippet[0] === '') snippet.shift();
    else topTrimmed = true;
  }

  let bottomTrimmed = false;
  while (!bottomTrimmed) {
    if (snippet[snippet.length - 1] === '') snippet.pop();
    else bottomTrimmed = true;
  }

  return snippet.join('\n');
};

const parseNameFromComment = (comment: string) => {
  let name = comment;
  // JS and TS single line comments
  if (name.includes('//')) {
    name = name.replace('//', '');
  }
  // Bash single line comments
  if (name.includes('#')) {
    name = name.replace('#', '');
  }
  // JS and TS multi line comments, CSS comments
  if (name.includes('/*')) {
    name = name.replace('/*', '').replace('*/', '');
  }
  // HTML, Vue, and Svelte comments
  if (comment.includes('<!--')) {
    name = name.replace('<!--', '').replace('-->', '');
  }

  // Trim remaining whitespace
  return name.trim();
};

type ParsedSnippet = [string, string];
/**
 *
 * @param content The string content of a code snippet
 * @returns A tuple containing the file name and the code
 */
export const parseSnippetContent = (
  content: string,
  isTerminalSnippet?: boolean
): ParsedSnippet => {
  if (isTerminalSnippet) {
    const command = TrimSnippet(content.split('\n'));

    return ['Terminal', command];
  }
  const [comment, ...rest] = content.split('\n');
  const fileName = parseNameFromComment(comment);

  const code = TrimSnippet([...rest]);

  return [fileName, code];
};
