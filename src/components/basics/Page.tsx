import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
// @ts-ignore
import { styles } from '@storybook/design-system';

const { spacing, breakpoint, pageMargin } = styles;

const DefaultMargin = styled.div({
  padding: `0 ${spacing.padding.medium}px`,
  [`@media (min-width: ${breakpoint * 1}px)`]: {
    margin: `0 ${pageMargin * 1}%`,
  },
  [`@media (min-width: ${breakpoint * 2}px)`]: {
    margin: `0 ${pageMargin * 2}%`,
  },
  [`@media (min-width: ${breakpoint * 3}px)`]: {
    margin: `0 ${pageMargin * 3}%`,
  },
  [`@media (min-width: ${breakpoint * 4}px)`]: {
    margin: `0 ${pageMargin * 4}%`,
  },
});

const SmallMargins = styled.div({
  padding: `0 ${spacing.padding.medium}px`,
  maxWidth: 800,
  margin: '0 auto',
});

export const PageMargin = ({ size = 'default', children }) => {
  switch (size) {
    case 'small': {
      return <SmallMargins>{children}</SmallMargins>;
    }
    case 'default':
    default: {
      return <DefaultMargin>{children}</DefaultMargin>;
    }
  }
};

const SplitWrapper = styled.div<{
  direction: 'row' | 'column';
  ratio: [number | string, number | string];
}>(({ direction, ratio }) => ({
  display: 'grid',
  [direction === 'row' ? 'grid-template-columns' : 'grid-template-rows']: ratio.join(' '),
  [direction === 'row' ? 'grid-column-gap' : 'grid-row-gap']: spacing.padding.medium,
}));
const SplitSection = styled.div({});

export const PageSplit: FunctionComponent<{
  direction?: 'row' | 'column';
  ratio?: [number | string, number | string];
  aside: JSX.Element;
  main?: JSX.Element;
}> = ({ children, aside, main = children, direction = 'row', ratio = ['300px', '1fr'] }) => (
  <SplitWrapper direction={direction} ratio={ratio}>
    <SplitSection>{aside}</SplitSection>
    <SplitSection>{main}</SplitSection>
  </SplitWrapper>
);
