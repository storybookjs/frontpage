import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Subheading, styles } from './../basics';
import Header from './Header';
import Footer from './Footer';

const { color, typography, pageMargins, breakpoint } = styles;

const Layout = styled.div``;

export default function PageLayout({ hasSubscribed, onSubscribe, children, ...props }) {
  return (
    <Layout {...props}>
      <Header />
      {children}
      <Footer hasSubscribed={hasSubscribed} onSubscribe={onSubscribe} />
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hasSubscribed: Footer.propTypes.hasSubscribed,
  onSubscribe: Footer.propTypes.onSubscribe,
};
