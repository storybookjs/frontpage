import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { global, styles } from '@storybook/design-system';
import styled from 'styled-components';

import useSiteMetadata from 'useSiteMetadata';

import Release from './Release';
import TableOfContents from './TableOfContents';
import { SocialGraph } from '../../basics';

const { GlobalStyle } = global;

const { breakpoint, color, pageMargins, typography } = styles;

const Content = styled.div`
  ${pageMargins}
  padding-bottom: 3rem;

  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    display: flex;
  }
`;

const Sidebar = styled.div`
  flex: 0 1 80px;
  padding-right: 80px;

  @media (max-width: ${breakpoint * 1.333 - 1}px) {
    flex: none;
    margin: 1rem 0 2rem;
    width: 100%;
    border-bottom: 1px solid ${color.mediumlight};
  }
`;

const StyledRelease = styled(Release)`
  max-width: 760px;
`;

const TOCHeader = styled.div`
  color: ${color.dark};
  font-size: ${typography.size.s3}px;
  font-weight: ${typography.weight.bold};
  line-height: 20px;
  margin-bottom: 12px;
`;

function ReleasesScreen({ data, ...props }) {
  const { ogImage, urls = {} } = useSiteMetadata();
  const { home } = urls;
  const {
    allReleases: { edges },
    currentPage: {
      body,
      frontmatter: { title },
      fields: { slug: currentPageSlug },
    },
  } = data;
  const tocEntries = edges.map(({ node }) => ({
    slug: node.fields.slug,
    title: node.fields.version,
  }));

  return (
    <>
      <GlobalStyle />
      <>
        <SocialGraph
          title="Storybook: UI component explorer for frontend developers"
          desc="Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient."
          url={home}
          image={ogImage}
        />
        <Content>
          <Sidebar>
            <TOCHeader>Versions</TOCHeader>
            <TableOfContents currentPageSlug={currentPageSlug} entries={tocEntries} />
          </Sidebar>

          <StyledRelease title={title} body={body} />
        </Content>
      </>
    </>
  );
}

ReleasesScreen.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ReleasesScreen;

export const query = graphql`
  query ReleasesScreenQuery($slug: String!) {
    allReleases: allMdx(
      sort: { fields: [fields___version], order: DESC }
      filter: {
        frontmatter: { prerelease: { ne: true } }
        fields: { pageType: { eq: "releases" } }
      }
    ) {
      edges {
        node {
          body
          fields {
            slug
            version
          }
          frontmatter {
            title
          }
        }
      }
    }
    currentPage: mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
      fields {
        version
        slug
      }
    }
  }
`;
