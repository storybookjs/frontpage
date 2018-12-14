import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { urls } from '../basics';
import Header from './Header';
import Footer from './Footer';

const { url } = urls;

const Layout = styled.div``;

export const navLinks = [
  { title: 'Docs', href: url.docs.home, isGatsby: false },
  { title: 'Addons', href: url.addons, isGatsby: true },
  { title: 'Community', href: url.community, isGatsby: true },
  { title: 'Use cases', href: url.useCases, isGatsby: true },
  { title: 'Support', href: url.support, isGatsby: true },
  { title: 'Team', href: url.team, isGatsby: true },
];

export default function PageLayout({ children, ...props }) {
  return (
    <Layout {...props}>
      <Header />
      {children}
      {'' /* TODO: make footer subscribed state self-contained */}
      <Footer hasSubscribed={false} onSubscribe={() => 0} />
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
