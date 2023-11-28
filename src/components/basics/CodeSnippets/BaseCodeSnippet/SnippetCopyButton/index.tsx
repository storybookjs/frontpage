import React from 'react';
import { styled } from '@storybook/theming';
import { color, spacing } from '@chromaui/tetra';
import { CopyIcon, CheckIcon } from '@storybook/icons';
import { useCopyToClipboard } from 'usehooks-ts';

const CodeSnippetCopyButton = styled.button`
  all: unset;
  background: none;
  border: none;
  border-radius: 5px;
  padding: ${spacing['2']};
  margin: 0;
  cursor: pointer;
  line-height: 0;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  color: ${color.slate500};

  &:focus {
    box-shadow: 0 0 0 2px rgba(30, 167, 253, 0.3);
    background-color: rgba(30, 167, 253, 0.14);
  }

  &:hover {
    background-color: rgba(30, 167, 253, 0.14);
    color: ${color.blue500};
  }
`;

export const SnippetCopyButton = ({ code }: { code: string }) => {
  const [copiedValue, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = React.useState(false);
  const timerRef = React.useRef<number>();

  const handleCopy = React.useCallback(() => {
    copyToClipboard(code);
    setIsCopied(true);
    timerRef.current = window.setTimeout(() => setIsCopied(false), 2000);
  }, [code, copyToClipboard]);

  React.useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <CodeSnippetCopyButton onClick={handleCopy} disabled={isCopied} aria-disabled={isCopied}>
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </CodeSnippetCopyButton>
  );
};
