import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, typography, pageMargins, breakpoint } from './../shared/styles';

import Subheading from './Subheading';

const Suptitle = styled(Subheading)``;

const Title = styled.div`
  font-size: ${typography.size.m2}px;
  font-weight: ${typography.weight.extrabold};
  line-height: 24px;
  margin-bottom: 0.5rem;

  @media (min-width: ${breakpoint}px) {
    font-size: ${typography.size.l1}px;
    line-height: 36px;
    margin-bottom: 0.75rem;
  }
`;

const Desc = styled.div`
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
    margin-bottom: 0;
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

export default function PageTitle({ suptitle, title, desc, ...props }) {
  return (
    <Wrapper {...props}>
      <Meta>
        <Suptitle>{suptitle}</Suptitle>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
      </Meta>
    </Wrapper>
  );
}

PageTitle.propTypes = {
  suptitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};
