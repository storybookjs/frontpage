import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { styles } from '@storybook/design-system';

const { color, pageMargins, pageMargin, breakpoint } = styles;

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
        padding-top: 1.5rem;
      }

      &:nth-child(n + 3) {
        padding-bottom: 1.5rem;
      }
    }
  }
`;

const Layout = styled.div`
  ${pageMargins};
  padding-bottom: calc(5rem - 40px);

  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 2}%;
  }
  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 3}%;
  }
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
