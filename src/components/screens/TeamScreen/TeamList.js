import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { styles } from '@storybook/design-system';

const { pageMargins, pageMargin, breakpoint } = styles;
const { typography } = styles;

const Heading = styled.div`
  font-size: ${typography.size.m2}px;
  font-weight: ${typography.weight.extrabold};
  line-height: 28px;
`;

const Text = styled.h1`
  font-size: ${typography.size.s3}px;
  line-height: 28px;
  margin-top: 12px;
`;

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
      width: 50%;
      padding: 2rem 0 0 0;
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
      <Heading>Steering committee</Heading>
      <Text>
        Storybook is guided by a steering committee of top maintainers whose contributions to the
        project continue to be instrumental in the growth and success of the projects.
      </Text>
      <Grid>{children}</Grid>
    </Layout>
  );
}

export { Layout };

TeamList.propTypes = {
  children: PropTypes.node.isRequired,
};

TeamList.defaultProps = {};
