import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from './../../basics';
import AddonItem from './AddonItem';

const { color, spacing, pageMargins, breakpoint } = styles;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;

  > *:not(button) {
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
    }
  }
`;

const Layout = styled.div`
  ${pageMargins};

  ${props =>
    props.appearance === 'official' &&
    css`
      padding-bottom: calc(5rem - 40px);
    `};
  ${props =>
    props.appearance === 'community' &&
    css`
      padding-bottom: 5rem;
    `};
`;

export default function AddonList({ appearance, children, ...props }) {
  return (
    <Layout appearance={appearance} {...props}>
      {appearance === 'official' ? <Grid>{children}</Grid> : <List>{children}</List>}
    </Layout>
  );
}

AddonList.propTypes = {
  children: PropTypes.node.isRequired,
  appearance: AddonItem.propTypes.appearance,
};

AddonList.defaultProps = {
  appearance: AddonItem.defaultProps.appearance,
};
