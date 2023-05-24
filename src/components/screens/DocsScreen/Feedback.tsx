import React from 'react';
import { css, styled } from '@storybook/theming';
import { Badge, Button, Link, OutlineCTA, styles } from '@storybook/design-system';

const { code, color, spacing, typography } = styles;

const DOCS_FEEDBACK_URL = '/.netlify/functions/docs-feedback';
const DISCUSSIONS_URL =
  'https://github.com/storybookjs/storybook/discussions/categories/documentation-feedback';

const heightTransitionTime = 100; // ms

interface FeedbackProps {
  slug: string;
  version: string;
  framework: string;
  codeLanguage: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.padding.small}px;
  width: 100%;
  min-width: 280px;
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;

  > :first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > :last-child {
    margin-left: -1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const RatingButton = ({ selected, ...props }) => (
  <Button appearance={selected ? 'secondaryOutline' : 'outline'} size="small" {...props} />
);

const Prompt = styled.p`
  color: ${color.dark};
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s2}px;
  margin: 0;
`;

const Expandable = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded?: boolean }>`
  flex: 1 0 100%;
  margin: ${spacing.padding.small}px 0 ${spacing.padding.large}px;
  padding: 0 1px;
  font-size: ${typography.size.s2}px;

  overflow: hidden;
  transition: height ${heightTransitionTime}ms ease-out;
  height: ${(props) => (props.isExpanded ? `${290 / 16}rem` : 0)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${spacing.padding.small}px;
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
    color: ${color.dark};
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

const inaccessiblyVisuallyHidden = css`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const SpuriousLabel = styled.label`
  ${inaccessiblyVisuallyHidden}
`;

const SpuriousTextarea = styled((props) => (
  <Textarea {...props} aria-hidden="true" tabIndex={-1} />
))`
  ${inaccessiblyVisuallyHidden}
`;

export const Feedback = ({
  slug,
  version,
  framework,
  codeLanguage,
  // @ts-expect-error - For Storybook only
  forceRating = null,
  // @ts-expect-error - For Storybook only
  forceResultUrl = '',
  // @ts-expect-error - For Storybook only
  forceError = '',
}: FeedbackProps) => {
  const [rating, setRating] = React.useState<'up' | 'down' | null>(forceRating);
  const [comment, setComment] = React.useState('');
  const [spuriousComment, setSpuriousComment] = React.useState('');
  const [error, setError] = React.useState(forceError);
  const [resultUrl, setResultUrl] = React.useState(forceResultUrl);

  const expanded = rating || resultUrl || error;

  const formRef = React.useRef<HTMLFormElement | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const commentFieldId = React.useMemo(() => Math.random().toString(36).substring(2, 15), []);

  const handleRatingClick = (whichRating) => () => {
    setError('');
    setRating(whichRating);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      textareaRef.current?.focus();
    }, heightTransitionTime);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(DOCS_FEEDBACK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          version,
          framework,
          codeLanguage,
          rating,
          comment,
          spuriousComment,
        }),
      });
      if (response.ok) {
        const { url } = await response.json();
        setResultUrl(url);
      } else {
        throw new Error();
      }
    } catch (e) {
      setError(e);
      // eslint-disable-next-line no-console
      console.error(e);
    }

    setRating(null);
    setComment('');
  };

  let expandedContent = (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Label htmlFor={commentFieldId}>Optional feedback</Label>
      <HelpText>
        Markdown accepted (<code>[link text](url)</code>, <code>_italic_</code>,{' '}
        <code>**bold**</code>, etc). Your anonymous feedback will be posted publicly{' '}
        <Link href={DISCUSSIONS_URL} target="_blank" tabIndex={!expanded ? -1 : undefined}>
          on GitHub
        </Link>
        .
      </HelpText>
      <Textarea
        id={commentFieldId}
        ref={textareaRef}
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder={`What ${rating === 'up' ? 'was' : 'wasn’t'} helpful?`}
        disabled={!expanded}
      />
      <SpuriousLabel htmlFor="comment" />
      <SpuriousTextarea
        id="comment"
        value={spuriousComment}
        onChange={(event) => setSpuriousComment(event.target.value)}
        placeholder="Your comment"
      />
      <Button appearance="secondary" size="small" disabled={!expanded}>
        Submit feedback
      </Button>
    </Form>
  );

  if (error) {
    expandedContent = (
      <OutlineCTA badge={<Badge status="error">Error</Badge>} action={<></>}>
        Something went wrong. Please try again.
      </OutlineCTA>
    );
  }

  if (resultUrl) {
    expandedContent = (
      <OutlineCTA
        action={
          <Link href={resultUrl} target="_blank" withArrow>
            View your comment on GitHub
          </Link>
        }
      >
        Thanks for your feedback!
      </OutlineCTA>
    );
  }

  return (
    <Wrapper>
      <ButtonGroup>
        <RatingButton
          disabled={resultUrl}
          onClick={handleRatingClick('up')}
          selected={rating === 'up'}
        >
          👍
        </RatingButton>
        <RatingButton
          disabled={resultUrl}
          onClick={handleRatingClick('down')}
          selected={rating === 'down'}
        >
          👎
        </RatingButton>
      </ButtonGroup>
      <Prompt>Was this page helpful?</Prompt>
      <Expandable isExpanded={expanded}>{expandedContent}</Expandable>
    </Wrapper>
  );
};
