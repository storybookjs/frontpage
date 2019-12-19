import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import useSiteMetadata from '../../lib/useSiteMetadata';

import { SocialGraph } from '../basics';
import Header from './Header';
import Footer from './Footer';

const Layout = styled.div``;

export default function PageLayout({ children, ...props }) {
  const { urls = {}, title, description, ogImage, googleSiteVerification } = useSiteMetadata();
  return (
    <Layout {...props}>
      <SocialGraph
        // this is default social graph styling, it will be overridden by page-specific oggraph
        title={title}
        desc={description}
        url={urls.home}
        image={ogImage}
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

        <meta name="google-site-verification" content={googleSiteVerification} />
      </Helmet>
      <Header />
      {children}
      <Footer />
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

PageLayout.defaultProps = {};
