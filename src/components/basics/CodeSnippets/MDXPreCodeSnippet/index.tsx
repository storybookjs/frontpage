import * as React from 'react';
import { BaseCodeSnippet } from '../BaseCodeSnippet';
import { parseSnippetContent } from '../utils/parse-snippet-content.utils';

export const MDXPreCodeSnippet = ({ children }) => {
  const { className = '', children: code } = children.props;
  const syntax = className.replace(/language-/, '');
  const isTerminal = syntax === 'shell';
  const hideHeader = syntax === '';
  const [title, snippet] = parseSnippetContent(code, isTerminal);

  return (
    <BaseCodeSnippet
      hideHeader={hideHeader}
      id="snippet-1"
      isTerminal={isTerminal}
      snippet={snippet}
      syntax={syntax}
      title={title}
    />
  );
};
