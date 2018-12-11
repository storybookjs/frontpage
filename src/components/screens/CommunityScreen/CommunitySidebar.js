import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from './../../basics';
const { color, spacing, typography, pageMargin, breakpoint } = styles;

const Title = styled.div`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.m2}px;
  margin-bottom: 0.75rem;
  line-height: 1.5rem;

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.l1}px;
    line-height: ${typography.size.l1}px;
    margin-bottom: 0.75rem;
  }
`;

const Desc = styled.div`
  color: ${color.dark};
  margin-bottom: 0.25rem;

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.m1}px;
    line-height: 32px;
  }
`;

const Children = styled.div`
  margin-top: 2rem;
  ${props =>
    !props.loneChild &&
    css`
      border-top: 1px solid ${color.border};
      padding-top: 2rem;
    `};
`;

const Wrapper = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
`;

export default function CommunitySidebar({ title, desc, children, loneChild, ...props }) {
  return (
    <Wrapper {...props}>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>

      {children && <Children loneChild={loneChild}>{children}</Children>}
    </Wrapper>
  );
}

CommunitySidebar.propTypes = {
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  children: PropTypes.node,
};

CommunitySidebar.defaultProps = {
  children: null,
};
