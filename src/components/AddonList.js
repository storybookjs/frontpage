import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, spacing, pageMargins, breakpoint } from './../shared/styles';

import AddonItem from './AddonItem';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    margin-bottom: 1.25rem;

    @media (min-width: ${breakpoint * 1}px) {
      width: 50%;
      margin-bottom: 3rem;

      &:nth-child(odd) {
        padding-right: 20px;
      }
      &:nth-child(even) {
        padding-left: 20px;
      }
    }
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;

  margin: 0 0px;

  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 -10px;
  }

  @media (min-width: ${breakpoint * 1.5}px) {
    margin: 0 -15px;
  }

  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 -20px;
  }

  .flex-wrapper {
    width: 100%;

    padding: 0 0 20px;

    @media (min-width: ${breakpoint * 1}px) {
      width: 50%;
      padding: 0px 10px 20px;
    }

    @media (min-width: ${breakpoint * 1.5}px) {
      width: 33.33%;
      padding: 0px 15px 30px;
    }

    @media (min-width: ${breakpoint * 2}px) {
      width: 25%;
      padding: 0px 20px 40px;
    }
  }
`;

const Layout = styled.div`
  ${pageMargins};
`;

export default function AddonList({ appearance, children }) {
  return (
    <Layout>{appearance === 'official' ? <Grid>{children}</Grid> : <List>{children}</List>}</Layout>
  );
}

AddonList.propTypes = {
  children: PropTypes.node.isRequired,
  appearance: AddonItem.propTypes.appearance,
};

AddonList.defaultProps = {
  appearance: AddonItem.defaultProps.appearance,
};
