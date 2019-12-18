import styled from '@emotion/styled';
import { Button, Link, styles, TooltipNote, WithTooltip } from '@storybook/design-system';

const { color, typography } = styles;

const StyledButton = styled(Button)`
  ${props =>
    props.isActive &&
    `
    background: ${color.tertiary};
    color: ${color.darkest};
  `}
`;

const TooltipWrapper = styled(WithTooltip)`
  &:first-child ${StyledButton} {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-left: 20px;
  }
  &:last-child ${StyledButton} {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-right: 20px;
  }
  &:not(:first-child):not(:last-child) ${StyledButton} {
    border-radius: 0;
  }

  &:not(:first-child) ${StyledButton} {
    margin-left: -1px;
  }

  &:hover ${StyledButton} {
    position: relative;
    z-index: 1;
  }
`;

const PillButton = styled(Link)`
  font-size: ${typography.size.s1}px;
  font-weight: ${typography.weight.bold};
  line-height: 1;
  display: inline-block;
  vertical-align: top;
  padding: 4px 8px;
  border-radius: 10px;

  &:hover {
    background: #e3f3ff;
    color: ${color.secondary};

    img {
      opacity: 1;
    }
  }

  img {
    height: 1rem;
    width: 1rem;
    opacity: 0.3;
    transition: all 150ms ease-out;
    margin: -3px 0;
  }

  ${props =>
    props.active &&
    css`
      background: #e3f3ff;
      color: ${color.secondary};

      img {
        opacity: 1;
      }
    `};
`;

const TabButton = styled(Link)`
  font-size: ${typography.size.s2 - 1}px;
  font-weight: ${typography.weight.bold};
  line-height: 20px;
  display: inline-block;

  padding: 10px 15px;

  &:hover {
    color: ${color.secondary};
  }

  ${props =>
    props.active &&
    css`
      color: ${color.secondary};
      box-shadow: ${color.secondary} 0 -3px 0 0 inset;
    `};
`;

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`;

export default function ButtonToggle({
  titles,
  onSelectIndex,
  selectedIndex,
  appearance = 'outline',
  ...props
}) {
  return (
    <Wrapper {...props}>
      {titles.map(({ title, tooltip }, index) => {
        switch (appearance) {
          case 'pill':
            return (
              <PillButton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                active={index === selectedIndex}
                onClick={() => onSelectIndex(index)}
                title={tooltip}
                secondary
                isButton
              >
                {title}
              </PillButton>
            );
          case 'tab':
            return (
              <TabButton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                active={index === selectedIndex}
                onClick={() => onSelectIndex(index)}
                title={tooltip}
                secondary
                isButton
              >
                {title}
              </TabButton>
            );
          case 'outline':
            return (
              <TooltipWrapper
                tagName="span"
                key={title}
                hasChrome={false}
                placement="bottom"
                trigger="hover"
                tooltip={<TooltipNote note={tooltip} />}
              >
                <StyledButton
                  isActive={index === selectedIndex}
                  onClick={() => onSelectIndex(index)}
                  appearance="outline"
                  size="small"
                >
                  {title}
                </StyledButton>
              </TooltipWrapper>
            );
          default:
            return 'this appearance is not supported';
        }
      })}
    </Wrapper>
  );
}

