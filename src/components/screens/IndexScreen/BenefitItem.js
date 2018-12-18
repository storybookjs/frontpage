import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LazyLoad, styles } from '../../basics';

const { color, typography, breakpoint } = styles;

const Image = styled.div`
  margin-right: 20px;
  margin-top: 4px;
  img {
    display: block;
    width: 120px;
    height: auto;
    margin: -7.5px;
  }

  @media (min-width: ${breakpoint * 1.5}px) {
    margin-bottom: 2rem;
    margin-right: 0;
    margin-top: 0;
    float: none;

    img {
      height: 260px;
      width: 240px;
      margin: -15px;
    }
  }
`;

const Title = styled.div`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
  margin-bottom: 0rem;

  @media (min-width: ${breakpoint * 1.5}px) {
    margin-bottom: 0.5rem;
    font-size: ${typography.size.m1}px;
    line-height: ${typography.size.m2}px;
  }
`;
const Desc = styled.div`
  color: ${color.dark};
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
`;

const Meta = styled.div``;

const Children = styled.div`
  margin-top: 0.25rem;
  @media (min-width: ${breakpoint * 1.5}px) {
    margin-top: 1rem;
  }
`;

const Wrapper = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (min-width: ${breakpoint * 1.5}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default function BenefitItem({ image, title, desc, children, ...props }) {
  return (
    <Wrapper {...props}>
      <Image>
        <LazyLoad once height="100%">
          {image}
        </LazyLoad>
      </Image>
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
