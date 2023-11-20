export const trimSnippet = (snippet: string[]) => {
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

const stringIsComment = (str: string) =>
  str.includes('//') || str.includes('#') || str.includes('/*') || str.includes('<!--');

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
    const command = trimSnippet(content.split('\n'));

    return ['Terminal', command];
  }

  const [firstLine, ...rest] = content.split('\n');
  const fileName = stringIsComment(firstLine) ? parseNameFromComment(firstLine) : '';

  const code = trimSnippet([...(stringIsComment(firstLine) ? [] : [firstLine]), ...rest]);

  return [fileName, code];
};
