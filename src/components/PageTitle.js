import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, typography, pageMargins, breakpoint } from './../shared/styles';

import Subheading from './Subheading';

export const Heading = styled(Subheading)`
  display: block;
  margin-bottom: 0.75rem;
  color: ${color.mediumdark};
  opacity: 0.8;

  ${props =>
    props.color === 'green' &&
    css`
      color: ${color.green};
    `};
  ${props =>
    props.color === 'seafoam' &&
    css`
      color: ${color.seafoam};
    `};
  ${props =>
    props.color === 'purple' &&
    css`
      color: ${color.purple};
    `};
  ${props =>
    props.color === 'gold' &&
    css`
      color: ${color.gold};
    `};
`;

export const Title = styled.div`
  font-size: ${typography.size.m2}px;
  font-weight: ${typography.weight.black};
  line-height: 24px;
  margin-bottom: 0.5rem;

  @media (min-width: ${breakpoint}px) {
    font-size: ${typography.size.l1}px;
    line-height: 36px;
    margin-bottom: 0.75rem;
  }
`;

export const Desc = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
  color: ${color.dark};

  @media (min-width: ${breakpoint}px) {
    font-size: ${typography.size.m1}px;
    line-height: 32px;
  }
`;

const Meta = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;

  @media (min-width: ${breakpoint}px) {
    max-width: 600px;
    margin-bottom: 0;

    ${Desc} {
      margin: 0 auto;
    }
  }
`;

const Wrapper = styled.div`
  ${pageMargins};
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;

  text-align: center;

  @media (min-width: ${breakpoint}px) {
    padding-top: 5rem !important;
    padding-bottom: 5rem !important;
  }
`;

export default function PageTitle({ heading, title, desc, color, ...props }) {
  return (
    <Wrapper {...props}>
      <Meta>
        <Heading color={color}>{heading}</Heading>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
      </Meta>
    </Wrapper>
  );
}

PageTitle.propTypes = {
  heading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['green', 'seafoam', 'gold', 'purple', 'default']),
};

PageTitle.defaultProps = {
  color: 'default',
};
