import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import Helmet from 'react-helmet';
import { Nav, LinksContextProvider, Eyebrow, Footer } from '@storybook/components-marketing';
import { Link as GatsbyLinkWrapper, useStaticQuery, graphql } from 'gatsby';
import '@docsearch/css';

import DocsLayout from './DocsLayout';

import useSiteMetadata from '../lib/useSiteMetadata';

import { SocialGraph } from '../basics';

const Layout = styled.div``;

const navLinks = {
  home: { url: '/', linkWrapper: GatsbyLinkWrapper },
  whyStorybook: { url: '/why', linkWrapper: GatsbyLinkWrapper },
  componentDriven: { url: 'https://componentdriven.org' },
  guides: { url: '/docs', linkWrapper: GatsbyLinkWrapper },
  tutorials: { url: 'https://storybook.js.org/tutorials' },
  api: { url: '/docs/api', linkWrapper: GatsbyLinkWrapper },
  changelog: { url: '/changelog', linkWrapper: GatsbyLinkWrapper },
  telemetry: { url: '/telemetry', linkWrapper: GatsbyLinkWrapper },
  showcase: { url: 'https://storybook.js.org/showcase' },
  projects: { url: 'https://storybook.js.org/showcase/projects' },
  componentGlossary: { url: 'https://storybook.js.org/showcase/glossary' },
  integrations: { url: '/integrations', linkWrapper: GatsbyLinkWrapper },
  getInvolved: { url: '/get-involved', linkWrapper: GatsbyLinkWrapper },
  blog: { url: 'https://storybook.js.org/blog' },
  hiring: { url: 'https://www.chromatic.com/company/jobs' },
};

export default function PageLayout({ children, pageContext, ...props }) {
  const { urls = {}, title, description, ogImage, googleSiteVerification } = useSiteMetadata();
  const isHomePage = props.location.pathname === '/';

  const { dxData } = useStaticQuery(graphql`
    query DXQuery {
      dxData {
        subscriberCount
        latestPost {
          title
          url
        }
      }
    }
  `);

  return (
    <LinksContextProvider value={navLinks}>
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
        {pageContext && pageContext.layout !== 'iframe' && (
          <>
            <Eyebrow
              label={dxData.latestPost.title}
              link={dxData.latestPost.url}
              inverse={isHomePage}
            />
            <Nav inverse={isHomePage} />
          </>
        )}
        {pageContext && pageContext.layout === 'docs' ? (
          <DocsLayout pageContext={pageContext} {...props}>
            {children}
          </DocsLayout>
        ) : (
          children
        )}
        {pageContext && pageContext.layout !== 'iframe' && (
          <Footer
            subscriberCount={dxData.subscriberCount}
            onSubscribe={() => {}}
            inverse={isHomePage}
          />
        )}
      </Layout>
    </LinksContextProvider>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

PageLayout.defaultProps = {};
