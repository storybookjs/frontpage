import React, { createElement, Fragment } from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import { DocumentWrapper } from '@storybook/components';
import { StickyContainer, Sticky } from 'react-sticky';
// @ts-ignore
import { TooltipLinkList } from '@storybook/design-system';
import Layout from '../components/layout/PageLayout';
import { Global } from '../components/lib/global';
import { PageMargin, PageSplit } from '../components/basics/Page';
import PageTitle from '../components/layout/PageTitle';

import { Query } from '../generated/graphql';

interface HastNode {
  type: 'element' | 'text' | 'root';
  tagName: string;
  value?: string;
  properties: Record<string, string>;
  children?: HastNode[];
}
const hastToJsx = (node: HastNode) => {
  if (!node) {
    return null;
  }

  switch (true) {
    case node.type === 'root': {
      return <Fragment key="root">{node.children.map(hastToJsx)}</Fragment>;
    }
    case node.type === 'text': {
      return node.value;
    }
    case node.type === 'element' && node.tagName === 'img':
    case node.type === 'element' && node.tagName === 'link':
    case node.type === 'element' && node.tagName === 'br': {
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

// @ts-ignore
const LinkWrapper = ({ href, isGatsby, children, ...props }: {}) => {
  if (isGatsby) {
    return (
      <GatsbyLink to={href} {...props}>
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

interface Props {
  data: {
    pageMarkdown: Query['markdownRemark'];
    navigation: Query['allFile'];
  };
}

export default ({ data: { pageMarkdown, navigation } }: Props) => {
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
          <StickyContainer>
            <PageSplit
              aside={
                <Sticky>
                  {({ style }) => (
                    <div style={style}>
                      <TooltipLinkList
                        links={navigation.nodes.map(n => ({
                          title: n.childMarkdownRemark.frontmatter.title,
                          href: `/docs/${n.relativeDirectory}`,
                          isGatsby: true,
                        }))}
                        LinkWrapper={LinkWrapper}
                      />
                    </div>
                  )}
                </Sticky>
              }
            >
              <DocumentWrapper>{hastToJsx(pageMarkdown.htmlAst)}</DocumentWrapper>
            </PageSplit>
          </StickyContainer>
        </PageMargin>
      </Layout>
    </Global>
  );
};

export const query = graphql`
  query One($id: String!, $scope: String!, $group: String!) {
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
    navigation: allFile(
      filter: {
        childMarkdownRemark: { id: { regex: "/./" } }
        relativeDirectory: { regex: $scope }
        sourceInstanceName: { eq: $group }
      }
    ) {
      nodes {
        relativeDirectory
        id
        childMarkdownRemark {
          frontmatter {
            title
            id
          }
          excerpt
        }
      }
    }
  }
`;
