import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { styles } from '../../basics';

const { breakpoint } = styles;

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  > * {
    margin-bottom: 2rem;
    @media (min-width: ${breakpoint * 1.333}px) {
      margin-bottom: 5rem;
    }
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
