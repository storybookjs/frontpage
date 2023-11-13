import React from 'react';
import PropTypes from 'prop-types';
import { color, styled } from '@storybook/theming';
import Helmet from 'react-helmet';
import {
  Nav,
  LinksContextProvider,
  Eyebrow,
  Footer,
  defaultLinks,
} from '@storybook/components-marketing';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyLinkWrapper from '../basics/GatsbyLinkWrapper';
import '@docsearch/css';

import DocsLayout from './DocsLayout';

import useSiteMetadata from '../lib/useSiteMetadata';

import { SocialGraph } from '../basics';
import {
  GLOBAL_SEARCH_AGNOSTIC,
  GLOBAL_SEARCH_IMPORTANCE,
  GLOBAL_SEARCH_META_KEYS,
} from '../../constants/global-search';

const Layout = styled.div``;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background: hsla(0, 0%, 100%, 0.6);
  backdrop-filter: saturate(180%) blur(5px);
`;

const ALGOLIA_API_KEY = process.env.GATSBY_ALGOLIA_API_KEY;

const navLinks = {
  ...defaultLinks,
  home: { url: '/', linkWrapper: GatsbyLinkWrapper },
  whyStorybook: { url: '/docs/react/get-started/why-storybook', linkWrapper: GatsbyLinkWrapper },
  guides: { url: '/docs', linkWrapper: GatsbyLinkWrapper },
  changelog: { url: '/releases', linkWrapper: GatsbyLinkWrapper },
  telemetry: { url: '/telemetry/', linkWrapper: GatsbyLinkWrapper },
  integrations: { url: '/integrations/', linkWrapper: GatsbyLinkWrapper },
  getInvolved: { url: '/community/', linkWrapper: GatsbyLinkWrapper },
};

function activeRouteSection(pathname) {
  if (pathname.includes('/why-storybook')) {
    return 'why';
  }
  if (pathname.startsWith('/docs')) {
    return 'docs';
  }
  if (
    pathname.startsWith('/addons') ||
    pathname.startsWith('/recipes') ||
    pathname.startsWith('/integrations')
  ) {
    return 'integrations';
  }
  if (pathname.startsWith('/community')) {
    return 'community';
  }

  return 'home';
}

export function PurePageLayout({ dxData, children, pageContext, ...props }) {
  const {
    algoliaDocSearchConfig,
    description,
    googleSiteVerification,
    latestVersionString,
    ogImage,
    title,
    urls = {},
    versionString,
  } = useSiteMetadata();
  const isHomePage = props.location.pathname === '/';

  const activeSection = activeRouteSection(props.location.pathname);

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

          {/* 
            Set the docsearch index facets defaults
          */}
          <meta
            key={GLOBAL_SEARCH_META_KEYS.VERSION}
            name={GLOBAL_SEARCH_META_KEYS.VERSION}
            content={GLOBAL_SEARCH_AGNOSTIC}
          />
          <meta
            key={GLOBAL_SEARCH_META_KEYS.IMPORTANCE}
            name={GLOBAL_SEARCH_META_KEYS.IMPORTANCE}
            content={GLOBAL_SEARCH_IMPORTANCE.AGNOSTIC}
          />
          <link
            rel="preconnect"
            href={`https://${algoliaDocSearchConfig.appId}-dsn.algolia.net`}
            crossOrigin
          />
        </Helmet>
        {pageContext && pageContext.layout === 'docs' ? (
          <>
            <NavWrapper>
              <Eyebrow
                label={dxData.latestPost.title}
                link={dxData.latestPost.url}
                inverse={isHomePage}
                githubStarCount={dxData.githubStars}
              />
              <Nav
                inverse={isHomePage}
                version={versionString || latestVersionString}
                apiKey={ALGOLIA_API_KEY}
                activeSection={activeSection}
              />
            </NavWrapper>
            <DocsLayout pageContext={pageContext} {...props}>
              {children}
            </DocsLayout>
          </>
        ) : (
          <>
            {pageContext.layout !== 'iframe' && (
              <>
                <Eyebrow
                  label={dxData.latestPost.title}
                  link={dxData.latestPost.url}
                  inverse={isHomePage}
                  githubStarCount={dxData.githubStars}
                />
                <Nav
                  inverse={isHomePage}
                  version={versionString || latestVersionString}
                  apiKey={ALGOLIA_API_KEY}
                  activeSection={activeSection}
                />
              </>
            )}
            {children}
          </>
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
