import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Highlight, global, styles } from '@storybook/design-system';
import { graphql } from 'gatsby';

import { SocialGraph } from '../../basics';
import PageLayout from '../../layout/PageLayout';
import { releaseFormatting } from '../../../styles/formatting';

const { breakpoint, color, pageMargins, typography } = styles;
const { GlobalStyle } = global;

// These styles are reproduced from Releases
const Title = styled.div`
  color: ${color.darkest};
  font-size: ${typography.size.l1}px;
  font-weight: ${typography.weight.black};
  letter-spacing: -0.33px;
  line-height: 40px;
  margin-bottom: 9px;
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

const Content = styled.div`
  ${pageMargins}
  padding-bottom: 3rem;

  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    display: flex;
  }
`;
const Wrapper = styled.div`
  ${releaseFormatting}
  flex: 1;
`;

function DocsScreen({ data, ...props }) {
  const {
    currentPage: {
      html,
      frontmatter: { title },
    },
  } = data;

  return (
    <>
      <GlobalStyle />
      <PageLayout {...props}>
        <SocialGraph
          title="Storybook: UI component explorer for frontend developers"
          desc="Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient."
          // url={home}
          // image={ogImage}
        />
        <Content>
          <Sidebar>
            {/* <TOCHeader>Versions</TOCHeader> */}
            {/* <TableOfContents currentPageSlug={currentPageSlug} entries={tocEntries} /> */}
          </Sidebar>
          <Wrapper {...props}>
            <Title>{title}</Title>
            <Highlight>{html}</Highlight>
          </Wrapper>
          >{/* <StyledRelease title={title} html={html} /> */}
        </Content>
      </PageLayout>
    </>
  );
}

export default DocsScreen;

export const query = graphql`
  query DocsScreenQuery($slug: String!) {
    allReleases: allMarkdownRemark(filter: { fields: { pageType: { eq: "docs" } } }) {
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
        slug
      }
    }
  }
`;
