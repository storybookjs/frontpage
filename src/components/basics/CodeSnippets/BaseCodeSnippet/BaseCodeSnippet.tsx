import React from 'react';
import { styled, css } from '@storybook/theming';
import { minSm, color, spacing, Text } from '@chromaui/tetra';

import { useSyntaxHighlighter, SupportedLanguages } from '../SyntaxHighlighterContext';
import { SnippetTypeIcon } from './SnippetTypeIcon';
import { SnippetCopyButton } from './SnippetCopyButton';

const CodeSnippetContainer = styled('div', {
  shouldForwardProp: (prop) => !['withTabs'].includes(prop),
})<{ withTabs?: boolean }>`
  border-radius: 5px;
  border: 1px solid ${color.slate300};
  padding: 0;
  margin-bottom: ${spacing['6']};

  ${({ withTabs }) =>
    withTabs &&
    css`
      border-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `}
`;

const CodeSnippetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${spacing['3']};
  height: ${spacing['10']};
  background: ${color.slate50};
  border-bottom: 1px solid ${color.slate300};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-left: 0px;
  margin-right: 0px;

  ${minSm} {
    padding: 0 ${spacing['5']};
  }
`;

const CodeSnippetHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  flex-direction: row;
  gap: ${spacing['2']};
  min-width: 0;

  & > svg {
    flex: 0 0 auto;
  }

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const CodeSnippetHeaderRight = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-direction: row;
  gap: ${spacing['1']};

  ${minSm} {
    gap: ${spacing['2']};
  }
`;

const CodeSnippetContent = styled.div<{ hideHeader?: boolean }>`
  background: ${color.white};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: auto;

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

const Loading = styled.div`
  color: ${color.slate500};
  padding: ${spacing['5']} !important;
`;

export interface CodeSnippetProps {
  Eyebrow?: React.ReactNode;
  hideHeader?: boolean;
  id: string;
  LanguageSelector?: React.ReactNode;
  snippet: string;
  syntax: SupportedLanguages;
  title: string;
  withTabs?: boolean;
}

export const BaseCodeSnippet = ({
  Eyebrow,
  hideHeader,
  id,
  LanguageSelector,
  snippet,
  syntax,
  title,
  withTabs,
  ...rest
}: CodeSnippetProps) => {
  const { isLoadingHighlighter, generateSnippetHTML } = useSyntaxHighlighter();

  return (
    <CodeSnippetContainer withTabs={withTabs} {...rest}>
      {hideHeader ? null : (
        <CodeSnippetHeader>
          <CodeSnippetHeaderLeft>
            <SnippetTypeIcon syntax={syntax} />
            <Text as="span" variant="body14" fontWeight="semibold" color="slate800">
              {title}
            </Text>
          </CodeSnippetHeaderLeft>
          <CodeSnippetHeaderRight>
            {LanguageSelector}
            <SnippetCopyButton code={snippet} />
          </CodeSnippetHeaderRight>
        </CodeSnippetHeader>
      )}
      {Eyebrow}
      {isLoadingHighlighter ? (
        <CodeSnippetContent hideHeader={hideHeader}>
          <Loading>Loading...</Loading>
        </CodeSnippetContent>
      ) : (
        <CodeSnippetContent
          dangerouslySetInnerHTML={{ __html: generateSnippetHTML(snippet, syntax) }}
          hideHeader={hideHeader}
        />
      )}
    </CodeSnippetContainer>
  );
};
