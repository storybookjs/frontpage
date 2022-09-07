import React, { FC } from 'react';
import { css, styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';

const { breakpoints, text, color, spacing } = styles;

const Image = styled.div`
  margin-right: 20px;
  flex: none;

  svg,
  img {
    display: block;
    width: 40px;
    height: auto;
  }
`;
const Title = styled.h2`
  ${text.largeBold};
  color: ${color.darkest};
  margin-bottom: 0.25rem;
`;
const Desc = styled.div`
  ${text.large};
  color: #586368;
`;
const Meta = styled.div<{ horizontal?: boolean }>`
  ${(props) =>
    props.horizontal &&
    css`
      width: 100%;
      display: flex;
      flex-direction: column;

      @media (min-width: ${breakpoints[2]}px) {
        flex-direction: row;
      }
    `}
`;
const ChildrenWrapper = styled.div<{ horizontal?: boolean }>`
  ${(props) =>
    props.horizontal
      ? css`
          flex: 1 1 auto;
          margin-top: 0.5rem;

          @media (min-width: ${breakpoints[2]}px) {
            margin-top: 0;
            margin-left: 30px;
          }
        `
      : css`
          margin-top: 0.5rem;
        `}
`;

const Wrapper = styled.div`
  padding: 30px;
  border-radius: ${spacing.borderRadius.small}px;
  border: 1px solid ${color.border};
  display: flex;
`;

interface SupportFeatureProps {
  image: React.ReactNode;
  title: string;
  desc: string;
  link: React.ReactNode;
  layout: 'vertical' | 'horizontal';
}

export const SupportFeature: FC<SupportFeatureProps> = ({
  image,
  title,
  desc,
  children,
  layout = 'vertical',
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Image>{image}</Image>
      <Meta horizontal={layout === 'horizontal'}>
        <div>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
        </div>
        {children && (
          <ChildrenWrapper horizontal={layout === 'horizontal'}>{children}</ChildrenWrapper>
        )}
      </Meta>
    </Wrapper>
  );
};
