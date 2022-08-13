import PropTypes from 'prop-types';
import React from 'react';
import { styled, Global, css } from '@storybook/theming';
import { Nav, LinksContextProvider, styles } from '@storybook/components-marketing';
import { Link as GatsbyLinkWrapper } from 'gatsby';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { BlogCTA } from './BlogCTA';
import { Hero } from './Hero';
import { Develop } from './Develop';
import { Test } from './Test';
import { Document } from './Document';
import { Share } from './Share';

const globalStyles = css`
  body {
    background-color: ${styles.color.midnight};
  }
`;

const BlogCTAWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px ${styles.spacing.padding.medium}px 0;
`;

const navLinks = {
  home: { url: '/', linkWrapper: GatsbyLinkWrapper },
  whyStorybook: { url: '/why', linkWrapper: GatsbyLinkWrapper },
  useCases: { url: '/use-cases', linkWrapper: GatsbyLinkWrapper },
  caseStudies: { url: '/case-studies', linkWrapper: GatsbyLinkWrapper },
  componentDriven: { url: 'https://componentdriven.org' },
  getStarted: { url: '/docs', linkWrapper: GatsbyLinkWrapper },
  guides: { url: '/docs/guides', linkWrapper: GatsbyLinkWrapper },
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

export function PureIndexScreen({ latestBlogPost }) {
  const { ogImage, urls = {} } = useSiteMetadata();
  const { home, docs = {} } = urls;
  return (
    <>
      <Global styles={globalStyles} />
      <SocialGraph
        title="Storybook: UI component explorer for frontend developers"
        desc="Storybook is an open source tool for building UI components and pages in isolation. It
          streamlines UI development, testing, and documentation."
        url={home}
        image={ogImage}
      />
      {latestBlogPost && (
        <BlogCTAWrapper>
          <BlogCTA {...latestBlogPost} />
        </BlogCTAWrapper>
      )}

      <LinksContextProvider value={navLinks}>
        <Nav inverse />
      </LinksContextProvider>

      <Hero />
      <Develop docs={docs} />
      <Test docs={docs} />
      <Document docs={docs} />
      <Share docs={docs} />
    </>
  );
}

PureIndexScreen.propTypes = {
  // eslint-disable-next-line react/require-default-props
  latestBlogPost: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default function IndexScreen(props) {
  return <PureIndexScreen {...props} />;
}
