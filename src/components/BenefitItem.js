import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from './basics';
const { color, spacing, typography, pageMargin, breakpoint } = styles;

const Image = styled.div`
  float: left;
  margin-right: 20px;
  margin-top: 4px;
  img {
    display: block;
  }

  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 1.25rem;
    margin-right: 0;
    margin-top: 0;
    float: none;

    img {
      height: 260px;
      width: 240px;
      margin-left: -15px;
    }
  }
`;

const Title = styled.div`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.m1}px;
  line-height: ${typography.size.m2}px;
  margin-bottom: 0.5rem;
`;
const Desc = styled.div`
  color: ${color.dark};
  font-size: ${typography.size.m1}px;
  line-height: ${typography.size.m3}px;
`;

const Meta = styled.div`
  overflow: hidden;
`;

const Children = styled.div`
  margin-top: 1rem;
`;

const Wrapper = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
`;

export default function BenefitItem({ image, title, desc, children, ...props }) {
  return (
    <Wrapper {...props}>
      <Image>{image}</Image>
      <Meta>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        {children && <Children>{children}</Children>}
      </Meta>
    </Wrapper>
  );
}

BenefitItem.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  children: PropTypes.node,
};

BenefitItem.defaultProps = {
  children: null,
};
