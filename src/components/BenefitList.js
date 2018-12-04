import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, spacing, pageMargin, breakpoint } from './../shared/styles';

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  > * {
    padding: 5rem 70px 4rem;
    flex: 1;
    border-bottom: 1px solid ${color.border};

    &:nth-child(-n + 2) {
      padding-top: 2rem;
    }

    &:nth-child(odd) {
      border-right: 1px solid ${color.border};
      padding-left: 45px;
    }

    &:nth-last-child(-n + 2) {
      border-bottom: none;
    }
  }

  @media (min-width: ${breakpoint * 1}px) {
    padding-bottom: 3rem;
  }

  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 3}%;
    > * {
      flex: 0 1 50%;
    }
  }

  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 4}%;
  }
`;

export default function BenefitList({ children }) {
  return <Layout>{children}</Layout>;
}

BenefitList.propTypes = {
  children: PropTypes.node.isRequired,
};
