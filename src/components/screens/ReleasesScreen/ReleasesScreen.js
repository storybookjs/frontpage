import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Highlight, global, styles } from '@storybook/design-system';
import styled from 'styled-components';

import useSiteMetadata from '../../lib/useSiteMetadata';

import TableOfContents from './TableOfContents';
import { SocialGraph } from '../../basics';
import PageLayout from '../../layout/PageLayout';
import { releaseForamtting } from '../../../styles/formatting';

const { GlobalStyle } = global;

const { breakpoint, color, pageMargins, typography } = styles;

const Content = styled.div`
  ${pageMargins}
  padding-top: 66px;
  padding-bottom: 66px;

  @media (min-width: ${breakpoint * 1.5}px) {
    display: flex;
  }
`;

const Sidebar = styled.div`
  flex: 0 1 80px;
  padding-right: 80px;
`;

const TOCHeader = styled.div`
  color: ${color.dark};
  font-size: ${typography.size.s3}px;
  font-weight: ${typography.weight.bold};
  line-height: 20px;
`;

const Title = styled.div`
  color: ${color.darkest};
  font-size: ${typography.size.l1}px;
  font-weight: ${typography.weight.black};
  letter-spacing: -0.33px;
  line-height: 40px;
  margin-bottom: 9px;
`;

const Release = styled.div`
  ${releaseForamtting}
`;

function ReleasesScreen({ data, ...props }) {
  const { ogImage, urls = {} } = useSiteMetadata();
  const { home } = urls;
  const {
    allReleases: { edges },
    currentPage: {
      html,
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
      <PageLayout {...props}>
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

          <Release>
            <Title>{title}</Title>
            <Highlight>{html}</Highlight>
          </Release>
        </Content>
      </PageLayout>
    </>
  );
}

ReleasesScreen.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ReleasesScreen;

export const query = graphql`
  query ReleasesScreenQuery($slug: String!) {
    allReleases: allMarkdownRemark(sort: { fields: [fields___version], order: DESC }) {
      edges {
        node {
          html
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
    currentPage: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
