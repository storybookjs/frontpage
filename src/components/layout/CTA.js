import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { spacing, typography, pageMargin, pageMargins, breakpoint } from './../../shared/styles';

const Text = styled.div`
  font-weight: ${typography.weight.black};

  font-size: ${typography.size.m1}px;
  line-height: ${typography.size.m2}px;
  margin-bottom: 1.5rem;

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.m2}px;
    line-height: ${typography.size.m3}px;
    margin-bottom: 0;
  }
`;
const Action = styled.div``;

const HrWrapper = styled.div`
  ${pageMargins};
`;

const Hr = styled.hr`
  margin: 0;
  display: block;
`;

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;

  padding: 3rem ${spacing.padding.medium}px;
  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 3}%;
    padding-bottom: 5rem;
    text-align: left;
  }
  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 4}%;
  }

  ${Text} {
    flex: 0 1 100%;
    @media (min-width: ${breakpoint * 1}px) {
      flex: 1;
      padding-right: 60px;
    }
  }
  ${Action} {
    flex: 0 0 100%;
    @media (min-width: ${breakpoint * 1}px) {
      flex: 0 0 auto;
    }
  }
`;

const Wrapper = styled.div``;

export default function CTA({ text, action, ...props }) {
  return (
    <Wrapper {...props}>
      <HrWrapper>
        <Hr />
      </HrWrapper>
      <Inner>
        <Text>{text}</Text>
        <Action>{action}</Action>
      </Inner>
    </Wrapper>
  );
}

CTA.propTypes = {
  text: PropTypes.node,
  action: PropTypes.node,
};

CTA.defaultProps = {
  text: null,
  action: null,
};
