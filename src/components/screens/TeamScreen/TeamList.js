import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { styles } from '@storybook/design-system';

import Section from './Section';

const { breakpoint } = styles;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: start;

  @media (min-width: ${breakpoint * 1}px) {
    flex-direction: row;
  }
`;

export default function TeamList({ children, heading, description, ...rest }) {
  return (
    <Section heading={heading} description={description} {...rest}>
      <Grid>{children}</Grid>
    </Section>
  );
}

TeamList.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
