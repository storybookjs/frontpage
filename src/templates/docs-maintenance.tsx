import React from 'react';
import { graphql } from 'gatsby';
import { DocumentWrapper, Spaced } from '@storybook/components';
// @ts-ignore
import Layout from '../components/layout/PageLayout';
import { Global } from '../components/lib/global';
import { PageMargin, PageSplit } from '../components/basics/Page';
import PageTitle from '../components/layout/PageTitle';
import { hastToJsx } from '../components/basics/Hast';
import { SideNavigation, SideNavigationGroup } from '../components/basics/SideNavigation';

import { Query, File } from '../generated/graphql';

interface Props {
  data: {
    content: Query['markdownRemark'];
    nav: Query['allFile'];
  };
}

const transformNavNodes = (nodes: File[]): SideNavigationGroup => {
  return {
    maintenance: nodes.reduce((acc, { name }) => {
      return {
        ...acc,
        [name]: {
          to: `/${name.toLowerCase()}`,
          title: name.toLowerCase().replace(/_/g, ' '),
        },
      };
    }, {}),
  };
};

export default ({ data: { content, nav } }: Props) => {
  const navGroups = transformNavNodes(nav.nodes);

  return (
    <Global>
      <Layout>
        <PageTitle heading="maintenance" title="Storybook's maintenance" desc="" color="blue" />
        <PageMargin>
          <PageSplit
            aside={
              <Spaced row={2}>
                <SideNavigation groups={navGroups} />
              </Spaced>
            }
          >
            <DocumentWrapper>{hastToJsx(content.htmlAst)}</DocumentWrapper>
          </PageSplit>
        </PageMargin>
      </Layout>
    </Global>
  );
};

export const query = graphql`
  query MaintenancePage($id: String!, $group: String!) {
    content: markdownRemark(parent: { id: { eq: $id } }) {
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

    nav: allFile(
      sort: { fields: absolutePath, order: ASC }
      filter: { sourceInstanceName: { eq: $group }, childMarkdownRemark: { id: { regex: "/./" } } }
    ) {
      nodes {
        name
      }
    }
  }
`;
