import React, { useCallback } from 'react';
import { styled, css } from '@storybook/theming';
import { color, spacing, Text } from '@chromaui/tetra';

import { useSyntaxHighlighter, SupportedLanguages } from '../SyntaxHighlighterContext';
import { SnippetTypeIcon } from './SnippetTypeIcon';
import { SnippetCopyButton } from './SnippetCopyButton';

const CodeSnippetContainer = styled.div`
  border-radius: 5px;
  border: 1px solid ${color.slate300};
  padding: 0;
  margin-bottom: ${spacing['6']};
`;

const CodeSnippetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 0 ${spacing['5']};
  height: ${spacing['10']};
  background: ${color.slate50};
  border-bottom: 1px solid ${color.slate300};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-left: 0px;
  margin-right: 0px;
`;

const CodeSnippetHeaderLeft = styled.div`
  margin-left: 0px;
  margin-right: 0px;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: ${spacing['2']};
`;

const CodeSnippetHeaderRight = styled.div`
  margin-left: 0px;
  margin-right: 0px;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: ${spacing['2']};
`;

const CodeSnippetContent = styled.div<{ hideHeader?: boolean }>`
  background: ${color.white};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  & > pre.shiki {
    margin: 0 !important;
    padding: ${spacing['5']} !important;
  }

  ${({ hideHeader }) =>
    hideHeader &&
    css`
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;

      & > pre.shiki {
        background: ${color.slate50} !important;
      }
    `}
`;

export interface CodeSnippetProps {
  hideHeader?: boolean;
  id: string;
  isTerminal?: boolean;
  renderLanguageSelector?: () => React.ReactNode;
  snippet: string;
  syntax: SupportedLanguages;
  title: string;
}

export const BaseCodeSnippet = ({
  hideHeader,
  id,
  isTerminal,
  renderLanguageSelector,
  snippet,
  syntax,
  title,
  ...rest
}: CodeSnippetProps) => {
  const { isLoadingHighlighter, generateSnippetHTML } = useSyntaxHighlighter();

  return (
    <CodeSnippetContainer {...rest}>
      {hideHeader ? null : (
        <CodeSnippetHeader>
          <CodeSnippetHeaderLeft>
            <SnippetTypeIcon syntax={syntax} />
            <Text as="span" variant="body14" fontWeight="semibold" color="slate800">
              {title}
            </Text>
          </CodeSnippetHeaderLeft>
          <CodeSnippetHeaderRight>
            {renderLanguageSelector ? renderLanguageSelector() : null}
            <SnippetCopyButton code={snippet} />
          </CodeSnippetHeaderRight>
        </CodeSnippetHeader>
      )}

      {isLoadingHighlighter ? (
        <CodeSnippetContent hideHeader={hideHeader}>Loading...</CodeSnippetContent>
      ) : (
        <CodeSnippetContent
          dangerouslySetInnerHTML={{ __html: generateSnippetHTML(snippet, syntax) }}
          hideHeader={hideHeader}
        />
      )}
    </CodeSnippetContainer>
  );
};
