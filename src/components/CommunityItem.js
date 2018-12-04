import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, spacing, typography, pageMargin, breakpoint } from './../shared/styles';

import Link from './Link';
import Icon from './Icon';

const Image = styled.div`
  float: left;
  margin-right: 10px;

  img {
    display: block;
    width: 60px;
    height: auto;
  }

  @media (min-width: ${breakpoint * 1}px) {
    margin-right: 40px;
    img {
      width: 140px;
    }
  }
`;

const Title = styled.div`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.s3}px;
  line-height: 1.5rem;

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.m1}px;
    line-height: ${typography.size.m2}px;
    margin-bottom: 0.5rem;
  }
`;

const Desc = styled.div`
  color: ${color.dark};
  font-size: ${typography.size.s3}px;
  line-height: 1.5rem;
  margin-bottom: 0.25rem;
`;

const StyledLink = styled(Link)`
  margin-right: 20px;
  font-size: ${typography.size.s3}px;
  line-height: 1.5rem;

  @media (min-width: ${breakpoint * 1}px) {
    margin-right: 40px;
  }

  display: inline-flex;
  align-items: center;

  svg {
    height: 0.7em;
    width: 0.7em;
    bottom: 0;
    margin-right: 0;
    margin-left: 4px;
  }
`;

const Meta = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
  display: flex;
  align-items: center;
`;

export default function CommunityItem({ image, title, desc, links, ...props }) {
  return (
    <Wrapper {...props}>
      <Image>{image}</Image>
      <Meta>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>

        {links &&
          links.map(({ title, href }, index) => (
            <StyledLink
              /* eslint-disable react/no-array-index-key */
              key={index}
              href={href}
            >
              <span>{title}</span>
              <Icon icon="arrowright" />
            </StyledLink>
          ))}
      </Meta>
    </Wrapper>
  );
}

CommunityItem.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
};

CommunityItem.defaultProps = {
  children: null,
};
