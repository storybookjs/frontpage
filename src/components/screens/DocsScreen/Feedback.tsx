import React from 'react';
import { styled } from '@storybook/theming';
import { Button, Link, WithTooltip as DSWithToolip, styles } from '@storybook/design-system';

const { code, color, spacing, typography } = styles;

const DOCS_FEEDBACK_URL = '/.netlify/functions/docs-feedback';

interface FeedbackProps {
  path: string;
  version: string;
  framework: string;
  codeLanguage: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.padding.small}px;
`;

const ButtonGroup = styled.div`
  display: flex;

  > :first-child button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > :last-child button {
    margin-left: -1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

// TODO: Double focus outline
const WithTooltip = (props) => <DSWithToolip trigger="click" tagName="span" {...props} />;

const RatingButton = ({ selected, ...props }) => (
  <Button appearance={selected ? 'secondaryOutline' : 'outline'} size="small" {...props} />
);

const Prompt = styled.p`
  color: ${color.dark};
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s2}px;
  margin: 0;
`;

const StyledCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${spacing.padding.small}px;
  padding: ${spacing.padding.small}px ${spacing.padding.medium}px;
  min-width: 420px;
  max-width: 100vw;
  font-size: ${typography.size.s2}px;
`;

const Label = styled.label`
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.bold};
`;

const HelpText = styled.p`
  font-size: ${typography.size.s1}px;
  margin: 0;

  code {
    ${code.small}
    font-size: inherit;
  }
`;

// Styles match SB DS Input
const Textarea = styled.textarea`
  appearance: none;
  border: none;
  background: ${color.lightest};
  color: ${color.darkest};
  font-size: ${typography.size.s2}px;
  line-height: 20px;
  padding: 10px 15px;
  box-shadow: ${color.border} 0 0 0 1px inset;

  width: 100%;
  min-height: 150px;

  &:focus {
    box-shadow: ${color.secondary} 0 0 0 1px inset;
  }

  &::placeholder {
    color: ${color.mediumdark};
  }
`;

const CommentForm = ({ closeTooltip, ...props }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.key === 'Escape') {
        closeTooltip();
      }
    }

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  return <StyledCommentForm ref={formRef} {...props} />;
};

export const Feedback = ({
  path,
  version,
  framework,
  codeLanguage,
  // @ts-expect-error - For Storybook only
  forceRating = null,
  // @ts-expect-error - For Storybook only
  forceResultUrl = '',
}: FeedbackProps) => {
  const [rating, setRating] = React.useState<'up' | 'down' | null>(forceRating);
  const [comment, setComment] = React.useState('');
  const [isDone, setIsDone] = React.useState(Boolean(forceResultUrl));
  const [resultUrl, setResultUrl] = React.useState(forceResultUrl);

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setRating(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClick = (whichRating) => () => {
    setRating(whichRating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(DOCS_FEEDBACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        version,
        framework,
        codeLanguage,
        rating,
        comment,
      }),
    });
    if (response.ok) {
      setIsDone(true);
      setRating(null);
      setComment('');
      const { url } = await response.json();
      setResultUrl(url);
    }
  };

  const tooltip = ({ onHide: closeTooltip }) => (
    <CommentForm
      onSubmit={handleSubmit}
      closeTooltip={() => {
        closeTooltip();
        setRating(null);
      }}
    >
      {isDone ? (
        <>
          <Prompt>Thanks for your feedback!</Prompt>
          {resultUrl && (
            <p>
              <Link href={resultUrl} target="_blank">
                View your comment on GitHub
              </Link>
            </p>
          )}
        </>
      ) : (
        <>
          <Label htmlFor="feedback-comment">Optional feedback</Label>
          <HelpText>
            Markdown accepted (<code>[link text](url)</code>, <code>_italic_</code>,{' '}
            <code>**bold**</code>, etc)
          </HelpText>
          <Textarea
            id="feedback-comment"
            value={comment}
            autoFocus
            onChange={(event) => setComment(event.target.value)}
            placeholder={`What ${rating === 'up' ? 'was' : 'wasn’t'} helpful?`}
          />
          <Button appearance="secondary" size="small">
            Submit feedback
          </Button>
        </>
      )}
    </CommentForm>
  );

  return (
    <Wrapper ref={wrapperRef}>
      <ButtonGroup>
        <WithTooltip startOpen={forceRating || forceResultUrl} tooltip={tooltip}>
          <RatingButton selected={rating === 'up'} onClick={handleClick('up')}>
            👍
          </RatingButton>
        </WithTooltip>
        <WithTooltip startOpen={forceRating || forceResultUrl} tooltip={tooltip}>
          <RatingButton selected={rating === 'down'} onClick={handleClick('down')}>
            👎
          </RatingButton>
        </WithTooltip>
      </ButtonGroup>
      <Prompt>Was this page helpful?</Prompt>
    </Wrapper>
  );
};
