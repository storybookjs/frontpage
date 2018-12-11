import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from './../basics';
const { spacing, pageMargin, pageMargins, breakpoint } = styles;

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;

  > * {
    padding-bottom: 3rem;
  }

  @media (min-width: ${breakpoint * 1}px) {
    padding-bottom: 3rem;
  }

  ${props =>
    props.columns === 2 &&
    css`
      @media (min-width: ${breakpoint * 1}px) {
        margin: 0 ${pageMargin * 3}%;
        > * {
          flex: 0 1 50%;
        }
      }
      @media (min-width: ${breakpoint * 2}px) {
        margin: 0 ${pageMargin * 4}%;
      }
    `};

  ${props =>
    props.columns === 3 &&
    css`
      ${pageMargins};
      @media (min-width: ${breakpoint * 1}px) {
        > * {
          flex: 0 1 25%;
        }
      }
    `};
`;

export default function FeaturesLayout({ columns, children }) {
  return <Layout columns={columns}>{children}</Layout>;
}

FeaturesLayout.propTypes = {
  columns: PropTypes.number,
  children: PropTypes.node,
};

FeaturesLayout.defaultProps = {
  columns: 2,
  children: null,
};
