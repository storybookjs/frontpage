import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, spacing, pageMargin, breakpoint } from './../shared/styles';

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  > * {
    padding: 0 ${spacing.padding.medium}px 3rem;
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
