import React, { FunctionComponent, HTMLAttributes } from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import styled from '@emotion/styled';
import { DocumentWrapper, Spaced } from '@storybook/components';
// @ts-ignore
import { Icon, Link as StyledLink } from '@storybook/design-system';
import Layout from '../components/layout/PageLayout';
import { Global } from '../components/lib/global';
import { PageMargin, PageSplit } from '../components/basics/Page';
import PageTitle from '../components/layout/PageTitle';
import { hastToJsx } from '../components/basics/Hast';
import { Pill, PillSection } from '../components/basics/Pill';
import { SideNavigation, SideNavigationGroup } from '../components/basics/SideNavigation';

import { Query, File } from '../generated/graphql';
import { setPath } from '../lib/setPath';

interface LinkProps {
  href: string;
  to: string;
  isGatsby: boolean;
}
const Link: FunctionComponent<Partial<LinkProps> & HTMLAttributes<HTMLAnchorElement>> = ({
  href,
  to = href,
  isGatsby = true,
  children,
  ...props
}) => {
  if (isGatsby) {
    return (
      <GatsbyLink to={to} {...props}>
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
};

interface Props {
  data: {
    content: Query['markdownRemark'];
    nav: Query['allFile'];
  };
}

const UnStyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
});

const getBranch = (sourceInstanceName: string) => {
  return sourceInstanceName === 'docs-master' ? 'master' : 'next';
};

const getLocalHref = (branch: string, relativeDirectory: string) => {
  const branchSection = branch === 'master' ? '' : branch;

  return ['/docs', branchSection, relativeDirectory].filter(Boolean).join('/');
};

const getGitHubHref = (sourceInstanceName: string, name: string, relativeDirectory: string) => {
  switch (sourceInstanceName) {
    case 'docs-maintenance': {
      return `${name}.md`;
    }
    case 'docs-addons': {
      return 'i-do-not-know-yet';
    }
    default: {
      return `/docs/src/pages/${`${relativeDirectory}/${name}`}.md`;
    }
  }
};

const GitHubLink = ({ sourceInstanceName, name, relativeDirectory }: File) => {
  const branch = getBranch(sourceInstanceName);
  const path = getGitHubHref(sourceInstanceName, name, relativeDirectory);

  return (
    <StyledLink href={`https://github.com/storybookjs/storybook/tree/${branch}/${path}`}>
      <Icon icon="github" aria-label="github icon" />
      edit this page on github
    </StyledLink>
  );
};

const Branches = ({ sourceInstanceName, relativeDirectory }: File) => {
  const branch = getBranch(sourceInstanceName);
  const branches = ['master', 'next'];
  return (
    <Pill fullWidth>
      {branches.map(b => (
        <PillSection
          key={b}
          // @ts-ignore
          as={UnStyledLink}
          data-active={b === branch}
          href={getLocalHref(b, relativeDirectory)}
        >
          {b}
        </PillSection>
      ))}
    </Pill>
  );
};

const transformNavNodes = (nodes: File[], branch: string): SideNavigationGroup => {
  return nodes.reduce((acc, { relativeDirectory, childMarkdownRemark }) => {
    setPath(
      acc,
      relativeDirectory,
      {
        to: getLocalHref(branch, relativeDirectory),
        title: childMarkdownRemark.frontmatter.title,
      },
      '/'
    );
    return acc;
  }, {});
};

export default ({ data: { content, nav } }: Props) => {
  const file: File = content.parent as File;
  const branch = getBranch(file.sourceInstanceName);
  const navGroups = transformNavNodes(nav.nodes, branch);

  return (
    <Global>
      <Layout>
        <PageTitle
          heading="documentation"
          title={content.frontmatter.title}
          desc={<GitHubLink {...file} />}
          color="blue"
        />
        <PageMargin>
          <PageSplit
            aside={
              <Spaced row={2}>
                <nav>
                  <Branches {...file} />
                </nav>
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
  query DocumentationPage($id: String!, $group: String!) {
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
      filter: {
        sourceInstanceName: { eq: $group }
        childMarkdownRemark: { id: { regex: "/./" }, frontmatter: { title: { regex: "/./" } } }
      }
      sort: { fields: absolutePath, order: ASC }
    ) {
      nodes {
        relativeDirectory
        childMarkdownRemark {
          frontmatter {
            id
            title
          }
        }
      }
    }
  }
`;
