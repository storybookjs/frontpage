import React, { createElement } from 'react';
import { graphql } from 'gatsby';
import { DocumentWrapper } from '@storybook/components';
import Layout from '../components/layout/PageLayout';
import { Global } from '../components/lib/global';
import { PageMargin } from '../components/basics/Page';
import PageTitle from '../components/layout/PageTitle';

const hastToJsx = node => {
  if (!node) {
    return null;
  }

  switch (true) {
    case node.type === 'root': {
      return <>{node.children.map(hastToJsx)}</>;
    }
    case node.type === 'text': {
      return node.value;
    }
    case node.type === 'element' && node.tagName === 'img': {
      return createElement(node.tagName, node.properties);
    }
    case node.type === 'element' && typeof node.tagName === 'string': {
      return createElement(node.tagName, node.properties, node.children.map(hastToJsx));
    }
    default: {
      return null;
    }
  }
};

export default ({ data: { pageMarkdown } }) => {
  return (
    <Global>
      <Layout>
        <PageTitle
          heading="documentation"
          title={pageMarkdown.frontmatter.title}
          desc={pageMarkdown.excerpt}
          color="blue"
        />
        <PageMargin>
          <DocumentWrapper>{hastToJsx(pageMarkdown.htmlAst)}</DocumentWrapper>
        </PageMargin>
      </Layout>
    </Global>
  );
};

export const query = graphql`
  query One($id: String!) {
    pageMarkdown: markdownRemark(parent: { id: { eq: $id } }) {
      parent {
        ... on File {
          sourceInstanceName
          name
          relativeDirectory
        }
      }
      frontmatter {
        id
        title
      }
      htmlAst
      headings(depth: h6) {
        value
        depth
      }
    }
  }
`;
