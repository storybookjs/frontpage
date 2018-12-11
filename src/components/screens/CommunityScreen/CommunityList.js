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
`;

export default function CommunityList({ children, ...props }) {
  return <Layout {...props}>{children}</Layout>;
}

CommunityList.propTypes = {
  children: PropTypes.node.isRequired,
};
