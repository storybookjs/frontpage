/* eslint-disable react/prop-types */
import React, { Fragment, FunctionComponent, HTMLAttributes } from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import styled from '@emotion/styled';
import { DocumentWrapper, Spaced } from '@storybook/components';
import { StickyContainer, Sticky } from 'react-sticky';
// @ts-ignore
import { Icon, Link as StyledLink } from '@storybook/design-system';
import Layout from '../components/layout/PageLayout';
import { Global } from '../components/lib/global';
import { PageMargin, PageSplit } from '../components/basics/Page';
import PageTitle from '../components/layout/PageTitle';
import { hastToJsx } from '../components/basics/Hast';
import { Pill, PillSection } from '../components/basics/Pill';

import { Query, File } from '../generated/graphql';

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

const NavLink = styled(
  ({ children, to, ...props }: { to: string } & HTMLAttributes<HTMLAnchorElement>) => {
    return (
      <GatsbyLink to={to} {...props} activeStyle={{ textDecoration: 'underline' }}>
        {children}
      </GatsbyLink>
    );
  }
)(
  {
    color: '#666666',
    display: 'block',
    marginBottom: '0.75rem',
    fontSize: '14px',
    lineHeight: '20px',
    textDecoration: 'none',
  },
  {
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-1px)',
      color: '#333333',
    },
  }
);

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
  return sourceInstanceName === 'docs-maintenance'
    ? `${name}.md`
    : `/docs/src/pages/${`${relativeDirectory}/${name}`}.md`;
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

const setPath = (obj: object, path: string | string[], value: any, delimiter = '.') => {
  let arr;
  let key;
  let p = path;

  if (typeof path === 'string') {
    p = path.split(delimiter || '.');
  }

  if (p.length > 0) {
    arr = p;
    [key] = arr;
    if (arr.length > 1) {
      arr.shift();
      // eslint-disable-next-line no-param-reassign
      obj[key] = setPath(obj[key] || {}, arr, value, delimiter);
    } else {
      // eslint-disable-next-line no-param-reassign
      obj[key] = value;
    }
  }
  return obj;
};

interface NavItem {
  title: string;
  to: string;
}
type NavGroup = Record<string, Record<string, NavItem>>;

const SideNavTitle = styled.header({
  display: 'block',
  fontSize: '12px',
  color: '#999999',
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  fontWeight: 900,
  lineHeight: '20px',
  marginBottom: '1rem',
});

const SideNav = ({ groups }: { groups: NavGroup }) => {
  return (
    <Fragment>
      {Object.entries(groups).map(([groupTitle, groupChildren], index, l) => {
        return (
          <Fragment>
            <nav key={groupTitle}>
              <SideNavTitle>{groupTitle}</SideNavTitle>
              {Object.entries(groupChildren).map(([key, link]) => (
                <NavLink key={key} to={link.to}>
                  {link.title}
                </NavLink>
              ))}
            </nav>
            {index !== l.length - 1 ? <hr /> : null}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

const transformNavNodes = (nodes: File[], branch: string): NavGroup => {
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
          <StickyContainer>
            <PageSplit
              aside={
                <Sticky>
                  {({ style }) => (
                    <div style={style}>
                      <Spaced row={2}>
                        <nav>
                          <Branches {...file} />
                        </nav>
                        <SideNav groups={navGroups} />
                      </Spaced>
                    </div>
                  )}
                </Sticky>
              }
            >
              <DocumentWrapper>{hastToJsx(content.htmlAst)}</DocumentWrapper>
            </PageSplit>
          </StickyContainer>
        </PageMargin>
      </Layout>
    </Global>
  );
};

export const query = graphql`
  query One($id: String!, $group: String!) {
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
