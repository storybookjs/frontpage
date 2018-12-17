import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

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

const PageLayout = ({ children, ...props }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Layout {...props}>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            {
              name: 'keywords',
              content:
                'UI, components, design systems, library, styleguide, catalog, React, Vue, Angular',
            },
          ]}
        >
          <html lang="en" />

          <meta property="og:image" content={data.site.siteMetadata.ogImage} />
          <meta name="twitter:image" content={data.site.siteMetadata.ogImage} />
          <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:description" content={data.site.siteMetadata.title} />
          <meta name="twitter:title" content={data.site.siteMetadata.title} />
          <meta name="twitter:description" content={data.site.siteMetadata.title} />
          <link
            rel="shortcut icon"
            type="image/png"
            href="/images/logos/icon-storybook.png"
            sizes="16x16 32x32 64x64"
          />

          <meta name="google-site-verification" content="" />
        </Helmet>
        <Header />
        {children}
        {'' /* TODO: make footer subscribed state self-contained */}
        <Footer hasSubscribed={false} onSubscribe={() => 0} />
      </Layout>
    )}
  />
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
