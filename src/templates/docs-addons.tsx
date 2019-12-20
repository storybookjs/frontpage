import React from 'react';
import { graphql } from 'gatsby';
import { DocumentWrapper, Spaced } from '@storybook/components';
// @ts-ignore
import { Icon, Link as StyledLink } from '@storybook/design-system';
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

const getBranch = (sourceInstanceName: string) => {
  return sourceInstanceName === 'docs-master' ? 'master' : 'next';
};

const GitHubLink = ({ sourceInstanceName, name }: File) => {
  const branch = getBranch(sourceInstanceName);

  return (
    <StyledLink
      href={`https://github.com/storybookjs/storybook/tree/${branch}/addons/${name}/README.md`}
    >
      <Icon icon="github" aria-label="github icon" />
      edit this page on github
    </StyledLink>
  );
};

const transformNavNodes = (nodes: File[]): SideNavigationGroup => {
  return {
    addons: nodes.reduce((acc, { name }) => {
      return { ...acc, [name]: { to: `/addons/${name}`, title: name } };
    }, {}),
  };
};

export default ({ data: { content, nav } }: Props) => {
  const file: File = content.parent as File;
  const navGroups = transformNavNodes(nav.nodes);

  return (
    <Global>
      <Layout>
        <PageTitle
          heading="addons"
          title="Storybook's official addons"
          desc={<GitHubLink {...file} />}
          color="blue"
        />
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
  query AddonPage($id: String!, $group: String!) {
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
