import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from './../../basics';
const { color, spacing, pageMargin, breakpoint } = styles;

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  ${'' /* This styles the BenefitItem's */};
  > * {
    padding-bottom: 3rem;

    @media (min-width: ${breakpoint * 1.5}px) {
      padding: 4rem 70px 4rem;
      flex: 1;
      border-bottom: 1px solid ${color.border};

      &:nth-child(-n + 2) {
        padding-top: 2rem;
      }

      &:nth-child(odd) {
        border-right: 1px solid ${color.border};
        padding-left: 45px;
      }

      &:nth-child(even) {
        padding-right: 45px;
      }

      &:nth-last-child(-n + 2) {
        border-bottom: none;
        padding-bottom: 1rem;
      }
    }
  }

  padding-left: ${spacing.padding.medium}px;
  padding-right: ${spacing.padding.medium}px;

  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 1}%;
  }

  @media (min-width: ${breakpoint * 1.5}px) {
    padding-bottom: 5rem;
    margin: 0 ${pageMargin * 2}%;
    > * {
      flex: 0 1 50%;
    }
  }

  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 3}%;
  }
  @media (min-width: ${breakpoint * 3}px) {
    margin: 0 ${pageMargin * 4}%;
  }
`;

export default function BenefitList({ children }) {
  return <Layout>{children}</Layout>;
}

BenefitList.propTypes = {
  children: PropTypes.node.isRequired,
};
