import React from 'react';
import styled from 'styled-components';
import { Highlight, TableOfContents, global, styles } from '@storybook/design-system';
import { graphql, Link as GatsbyLink } from 'gatsby';

import { SocialGraph } from '../basics';

const { breakpoint, color, pageMargins, typography } = styles;
const { GlobalStyle } = global;

const Sidebar = styled.div`
  width: 276px;
  min-width: 276px;
  padding-right: 56px;

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

const StyledTableOfContents = styled(TableOfContents)`
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
  overflow: scroll;
`;

const LinkWrapper = ({ href, ...props }) => {
  return <GatsbyLink to={href} {...props} />;
};

function DocsLayout({ children, data, pageContext, ...props }) {
  const {
    currentPage: {
      fields: { slug },
    },
  } = data;
  const addLinkWrappers = (items) =>
    items.map((item) => ({
      ...item,
      ...(item.type.match(/link/) && { LinkWrapper }),
      ...(item.children && { children: addLinkWrappers(item.children) }),
    }));
  const docsTocWithLinkWrappers = addLinkWrappers(pageContext.docsToc);

  return (
    <>
      <GlobalStyle />
      <SocialGraph
        title="Storybook: UI component explorer for frontend developers"
        desc="Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient."
        // url={home}
        // image={ogImage}
      />
      <Content>
        <Sidebar>
          <StyledTableOfContents currentPath={slug} items={docsTocWithLinkWrappers} />
        </Sidebar>
        {children}
      </Content>
    </>
  );
}

export default DocsLayout;

export const query = graphql`
  fragment DocsLayoutCurrentPageQuery on MarkdownRemark {
    fields {
      slug
    }
  }
`;
