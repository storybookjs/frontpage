import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { styles } from '@storybook/design-system';
import AddonItem from './AddonItem';

const { pageMargins, breakpoint } = styles;

const List = styled.div`
  > * {
    margin-bottom: 1.25rem;

    @media (min-width: ${breakpoint * 1}px) {
      margin-bottom: 1.5rem;
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

  ${(props) =>
    props.appearance === 'official' &&
    `
      padding-bottom: calc(5rem - 40px);
    `};
  ${(props) =>
    props.appearance === 'community' &&
    `
      padding-bottom: 3rem;
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
