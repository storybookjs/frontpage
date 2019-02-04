import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { SocialGraph, site } from '../basics';
import Header from './Header';
import Footer from './Footer';

const { metadata, url } = site;

const Layout = styled.div``;

export const navLinks = [
  { title: 'Docs', href: url.docs.home, isGatsby: false },
  { title: 'Addons', href: url.addons, isGatsby: true },
  { title: 'Community', href: url.community, isGatsby: true },
  { title: 'Use cases', href: url.useCases, isGatsby: true },
  { title: 'Support', href: url.support, isGatsby: true },
  { title: 'Team', href: url.team, isGatsby: true },
];

export default function PageLayout({ allMediumPost, children, ...props }) {
  return (
    <Layout {...props}>
      <SocialGraph
        // this is default social graph styling, it will be overridden by page-specific oggraph
        title={metadata.title}
        desc={metadata.description}
        url={url.home}
        image={metadata.ogImage}
      />
      <Helmet
        meta={[
          {
            name: 'keywords',
            content:
              'UI, components, design systems, library, styleguide, catalog, React, Vue, Angular',
          },
        ]}
      >
        <html lang="en" />
        <link
          rel="shortcut icon"
          type="image/png"
          href="/images/logos/icon-storybook.png"
          sizes="16x16 32x32 64x64"
        />

        <meta name="google-site-verification" content={metadata.googleSiteVerification} />
      </Helmet>
      <Header />
      {children}
      <Footer mediumPosts={allMediumPost} />
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
