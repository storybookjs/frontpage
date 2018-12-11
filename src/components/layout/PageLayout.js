import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Subheading, styles } from './../basics';
import Header from './Header';
import Footer from './Footer';

const { color, typography, pageMargins, breakpoint } = styles;

const Layout = styled.div``;

export default function PageLayout({ children, ...props }) {
  return (
    <Layout {...props}>
      <Header />
      {children}
      <Footer />
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
