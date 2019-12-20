import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { styles } from '@storybook/design-system';

const { typography } = styles;

const StyledSection = styled.section`
  &:nth-of-type(n + 2) {
    margin-top: 4rem;
  }
`;

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

export default function Section({ children, heading, description, ...rest }) {
  return (
    <StyledSection {...rest}>
      <Heading>{heading}</Heading>
      <Text>{description}</Text>
      {children}
    </StyledSection>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};
