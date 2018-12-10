import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from './../../basics';
const { color, spacing, pageMargin, breakpoint } = styles;

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  > * {
    margin-bottom: 5rem;
    flex: 1;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: ${breakpoint * 1}px) {
    padding-bottom: 3rem;
  }
`;

export default function CommunityList({ children }) {
  return <Layout>{children}</Layout>;
}

CommunityList.propTypes = {
  children: PropTypes.node.isRequired,
};
