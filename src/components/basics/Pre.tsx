import * as React from 'react';

import { BaseCodeSnippet } from './CodeSnippets/BaseCodeSnippet';
import { parseSnippetContent } from './CodeSnippets/utils/parse-snippet-content.utils';

export const Pre = ({ children }) => {
  const id = React.useId();

  const { className = '', children: code } = children.props;
  const syntax = className.replace(/language-/, '');
  const isTerminal = syntax === 'shell';
  const hideHeader = syntax === '';
  const [title, snippet] = parseSnippetContent(code, isTerminal);

  return (
    <BaseCodeSnippet
      hideHeader={hideHeader}
      id={`pre-${id}`}
      snippet={snippet}
      syntax={syntax}
      title={title}
    />
  );
};
