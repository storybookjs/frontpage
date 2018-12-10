import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { styles } from './../../basics';
const { color, typography, breakpoint } = styles;

const Image = styled.div`
  float: left;
  margin-right: 20px;
  margin-top: 4px;
  svg {
    display: block;
  }

  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 1.25rem;
    margin-right: 0;
    margin-top: 0;
    float: none;
  }
`;
const Title = styled.div`
  font-weight: ${typography.weight.black};
  margin-bottom: 0.25rem;
`;
const Desc = styled.div`
  color: ${color.dark};
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

export default function Feature({ image, title, desc, children, ...props }) {
  return (
    <Wrapper {...props}>
      {image && <Image>{image}</Image>}
      <Meta>
        {title && <Title>{title}</Title>}
        {desc && <Desc>{desc}</Desc>}
        {children && <Children>{children}</Children>}
      </Meta>
    </Wrapper>
  );
}

Feature.propTypes = {
  image: PropTypes.node,
  title: PropTypes.node,
  desc: PropTypes.node,
  children: PropTypes.node,
};

Feature.defaultProps = {
  image: null,
  title: null,
  desc: null,
  children: null,
};
