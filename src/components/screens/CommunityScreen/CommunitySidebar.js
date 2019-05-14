import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from '@storybook/design-system';

const { color, typography, breakpoint } = styles;

const Title = styled.h2`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.m2}px;
  margin-bottom: 0.75rem;
  line-height: 1.5rem;

  @media (min-width: ${breakpoint * 1.333}px) {
    font-size: ${typography.size.l1}px;
    line-height: ${typography.size.l1}px;
    margin-bottom: 0.75rem;
  }
`;

const Desc = styled.div`
  color: ${color.dark};
  margin-bottom: 0.25rem;

  @media (min-width: ${breakpoint * 1.333}px) {
    font-size: ${typography.size.m1}px;
    line-height: 32px;
    margin-bottom: 0;
  }
`;

const Children = styled.div`
  margin-top: 1rem;
  @media (min-width: ${breakpoint * 1.333}px) {
    margin-top: 1.5rem;
  }
  ${props =>
    !props.loneChild &&
    css`
      border-top: 1px solid ${color.border};
      padding-top: 1rem;
      @media (min-width: ${breakpoint * 1.333}px) {
        padding-top: 2rem;
      }
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
  loneChild: PropTypes.bool,
};

CommunitySidebar.defaultProps = {
  children: null,
  loneChild: false,
};
