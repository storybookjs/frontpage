/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import styled from '@emotion/styled';
// @ts-ignore
import { document } from 'global';
import { DocumentWrapper, Spaced } from '@storybook/components';
import { StickyContainer, Sticky } from 'react-sticky';
// @ts-ignore
import { TooltipLinkList, Icon, Link as StyledLink } from '@storybook/design-system';
import Layout from '../components/layout/PageLayout';
import { Global } from '../components/lib/global';
import { PageMargin, PageSplit } from '../components/basics/Page';
import PageTitle from '../components/layout/PageTitle';
import { hastToJsx } from '../components/basics/Hast';
import { Pill, PillSection } from '../components/basics/Pill';

import { Query, File } from '../generated/graphql';

// @ts-ignore
const Link = ({ href, to = href, isGatsby = true, children, ...props }: {}) => {
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

// @ts-ignore
const DocsLink = ({ href, isGatsby = true, children, ...props }: {}) => {
  const to =
    !href.match(/^\/docs\/next/) && document.location.pathname.match(/^\/docs\/next\/./)
      ? href.replace('/docs/', '/docs/next/')
      : href;

  return (
    <GatsbyLink to={to} {...props}>
      {children}
    </GatsbyLink>
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

const GitHubLink = ({ sourceInstanceName, name, relativeDirectory }: File) => {
  const path =
    sourceInstanceName === 'docs-maintenance'
      ? `${name}.md`
      : `/docs/src/pages/${`${relativeDirectory}/${name}`}.md`;
  const branch = getBranch(sourceInstanceName);
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
      {branches.map(o => (
        <PillSection
          key={o}
          as={UnStyledLink}
          data-active={o === branch}
          href={o === 'master' ? `/docs/${relativeDirectory}` : `/docs/${o}/${relativeDirectory}`}
        >
          {o}
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

const SideNav = ({ data }: { data: File[] }) => {
  const groups = data.reduce((acc, { relativeDirectory, childMarkdownRemark }) => {
    setPath(
      acc,
      relativeDirectory,
      {
        href: relativeDirectory,
        title: childMarkdownRemark.frontmatter.title,
      },
      '/'
    );
    return acc;
  }, {});

  return (
    <Fragment>
      {Object.entries(groups).map(([sectionTitle, sectionValues]) => {
        return (
          <nav key={sectionTitle}>
            <h1>{sectionTitle}</h1>
            <TooltipLinkList
              links={Object.entries(sectionValues).map(([key, v]) => {
                return {
                  key,
                  ...v,
                };
              })}
              LinkWrapper={DocsLink}
            />
          </nav>
        );
      })}
    </Fragment>
  );
};

export default ({ data: { content, nav } }: Props) => {
  const file: File = content.parent as File;
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
                        <SideNav data={nav.nodes} />
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
