import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from '../basics';

const { background, color, typography, spacing } = styles;

const Wrapper = styled.div`
  text-align: center;
  padding: 6px ${spacing.padding.large}px;
  font-size: ${typography.size.s1}px;
  line-height: 1rem;
  background: ${background.appInverse};
  color: ${color.lightest};

  ${props =>
    props.warning &&
    css`
      background: ${background.warning};
      color: ${color.darker};
    `};
  ${props =>
    props.positive &&
    css`
      background: ${background.positive};
      color: ${color.darker};
    `};
`;

export default function Eyebrow({ children, ...props }) {
  return <Wrapper {...props}>{children}</Wrapper>;
}

Eyebrow.propTypes = {
  children: PropTypes.node.isRequired,
};
