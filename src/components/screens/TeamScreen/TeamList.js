import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from '../../basics';

const { color, spacing, pageMargins, breakpoint } = styles;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: start;

  margin: 0 0px;

  @media (min-width: ${breakpoint * 1}px) {
    flex-direction: row;
  }

  > * {
    padding-bottom: 2rem;

    @media (min-width: ${breakpoint * 1}px) {
      width: 33.333%;
      padding: 3rem 20px;

      &:not(:nth-child(3n)) {
        border-right: 1px solid ${color.border};
      }

      &:nth-child(-n + 3) {
        border-bottom: 1px solid ${color.border};
      }
    }
  }
`;

const Layout = styled.div`
  ${pageMargins};
  padding-bottom: calc(5rem - 40px);
`;

export default function TeamList({ children, ...props }) {
  return (
    <Layout {...props}>
      <Grid>{children}</Grid>
    </Layout>
  );
}

TeamList.propTypes = {
  children: PropTypes.node.isRequired,
};

TeamList.defaultProps = {};
