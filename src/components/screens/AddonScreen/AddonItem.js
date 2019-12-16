import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link, styles } from '@storybook/design-system';

const { color, typography, breakpoint } = styles;

// TODO: This CSS needs a refactor.

const Image = styled.div`
  float: left;
  margin-right: 20px;

  img {
    display: block;
    max-width: 100px;
    width: 100%;
    height: auto;

    @media (min-width: ${breakpoint * 1}px) {
      max-width: 192px;
      margin: 0 auto;
    }
  }

  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 1.5rem;
    margin-right: 0;
    margin-top: 0;
    float: none;
  }
`;

const Title = styled.div`
  font-weight: ${typography.weight.extrabold};
  font-size: ${typography.size.s3}px;
  line-height: 1.5rem;

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.m1}px;
    line-height: ${typography.size.m2}px;
    margin-bottom: 0.5rem;
  }

  color: ${color.darkest};

  &:hover,
  &:active {
    color: ${color.darkest};
  }
`;

const TitleLink = styled(Link)`
  font-weight: ${typography.weight.extrabold};
  font-size: ${typography.size.s3}px;
  line-height: 1.5rem;
  margin-bottom: 0.25rem;
`;

const Desc = styled.div`
  color: ${color.dark};
`;

const Meta = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
  text-align: left;
`;

const WrapperLink = styled.a`
  @media (min-width: ${breakpoint * 1}px) {
    height: 100%;
  }
  @media (min-width: ${breakpoint * 1.5}px) {
    max-width: 320px;
  }

  display: block;
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
  overflow: hidden;

  text-decoration: none;

  padding: 20px;

  @media (min-width: ${breakpoint * 1}px) {
    padding: 2.5rem 2.5rem 3rem;
    text-align: center;
  }

  background: ${color.lightest};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  transition: all 150ms ease-out;
  transform: translate3d(0, 0, 0);
  cursor: pointer;

  &:hover {
    transform: translate3d(0, -2px, 0);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translate3d(0, 0, 0);
  }
`;

const FlexWrapper = styled.div`
  // So I can get the selector in AddonList
`;

export default function AddonItem({ image, title, desc, addonUrl, appearance, ...props }) {
  if (appearance === 'official') {
    return (
      <FlexWrapper className="flex-wrapper">
        <WrapperLink appearance={appearance} href={addonUrl} {...props}>
          <Image>{image}</Image>
          <Meta>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
          </Meta>
        </WrapperLink>
      </FlexWrapper>
    );
  }

  return (
    <Wrapper {...props}>
      <Meta>
        <TitleLink href={addonUrl} rel="nofollow">
          {title}
        </TitleLink>
        <Desc>{desc}</Desc>
      </Meta>
    </Wrapper>
  );
}

AddonItem.propTypes = {
  appearance: PropTypes.oneOf(['official', 'community']),
  image: PropTypes.node,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  addonUrl: PropTypes.string.isRequired,
};

AddonItem.defaultProps = {
  appearance: 'community',
  image: null,
};
