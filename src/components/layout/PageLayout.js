import React from 'react';
import PropTypes from 'prop-types';
import { color, styled } from '@storybook/theming';
import Helmet from 'react-helmet';
import { Nav, LinksContextProvider, Eyebrow, Footer } from '@storybook/components-marketing';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyLinkWrapper from '../basics/GatsbyLinkWrapper';
import '@docsearch/css';

import DocsLayout from './DocsLayout';

import useSiteMetadata from '../lib/useSiteMetadata';

import { SocialGraph } from '../basics';

const Layout = styled.div``;

const ALGOLIA_API_KEY = process.env.GATSBY_ALGOLIA_API_KEY;

const navLinks = {
  home: { url: '/', linkWrapper: GatsbyLinkWrapper },
  whyStorybook: { url: '/docs/react/why-storybook', linkWrapper: GatsbyLinkWrapper },
  componentDriven: { url: 'https://componentdriven.org' },
  guides: { url: '/docs', linkWrapper: GatsbyLinkWrapper },
  tutorials: { url: 'https://storybook.js.org/tutorials' },
  changelog: { url: '/changelog', linkWrapper: GatsbyLinkWrapper },
  telemetry: { url: '/telemetry/', linkWrapper: GatsbyLinkWrapper },
  showcase: { url: 'https://storybook.js.org/showcase' },
  projects: { url: 'https://storybook.js.org/showcase/projects' },
  componentGlossary: { url: 'https://storybook.js.org/showcase/glossary' },
  integrations: { url: '/addons/', linkWrapper: GatsbyLinkWrapper },
  getInvolved: { url: '/community/', linkWrapper: GatsbyLinkWrapper },
  blog: { url: 'https://storybook.js.org/blog' },
  hiring: { url: 'https://www.chromatic.com/company/jobs' },
};

export function PurePageLayout({ dxData, children, pageContext, ...props }) {
  const {
    urls = {},
    title,
    description,
    ogImage,
    googleSiteVerification,
    versionString,
    latestVersionString,
  } = useSiteMetadata();
  const isHomePage = props.location.pathname === '/';

  const { framework } = pageContext;

  return (
    <LinksContextProvider value={navLinks}>
      <Layout id="page-top">
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
            {
              name: 'theme-color',
              content: isHomePage ? color.midnight : color.lightest,
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
              githubStarCount={dxData.githubStars}
            />
            <Nav
              inverse={isHomePage}
              framework={framework || 'react'}
              version={versionString || latestVersionString}
              apiKey={ALGOLIA_API_KEY}
            />
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

export default function PageLayout(props) {
  const { dxData } = useStaticQuery(graphql`
    query DXQuery {
      dxData {
        subscriberCount
        githubStars
        latestPost {
          title
          url
        }
      }
    }
  `);

  return <PurePageLayout dxData={dxData} {...props} />;
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

PageLayout.defaultProps = {};
