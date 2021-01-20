import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  Icon,
  Input,
  Link,
  Button,
  TableOfContents,
  TooltipLinkList,
  TooltipNote,
  WithTooltip,
  global,
  styles,
} from '@storybook/design-system';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import { SocialGraph } from '../basics';
import GatsbyLinkWrapper from '../basics/GatsbyLinkWrapper';

import useSiteMetadata from '../lib/useSiteMetadata';
import buildPathWithFramework from '../../util/build-path-with-framework';
import { FrameworkSelector } from '../screens/DocsScreen/FrameworkSelector';
import stylizeFramework from '../../util/stylize-framework';
import useAlgoliaSearch, { SEARCH_INPUT_ID } from '../../hooks/use-algolia-search';

const { breakpoint, color, pageMargins, typography } = styles;
const { GlobalStyle } = global;

const Sidebar = styled.div`
  flex: 1;
  margin: 1rem 0 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${color.border};

  @media (min-width: ${breakpoint * 1.333}px) {
    flex: 0 0 240px;
    margin: 0;
    padding-bottom: 0;
    padding-right: 20px;
    margin-right: 20px;
    border-bottom: none;
  }
`;

const StyledFrameworkSelector = styled(FrameworkSelector)`
  @media (min-width: ${breakpoint * 1.333}px) {
    margin-top: 1.5rem;
  }
`;

const SearchInput = styled(Input)`
  .algolia-autocomplete {
    width: 100%;
  }

  && input {
    font-size: ${typography.size.s2}px;
    padding-left: 36px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  && svg {
    left: 14px;
    font-size: ${typography.size.s2}px;
  }
`;

const ExpandButton = styled(Button)`
  height: 36px;
  width: 36px;
`;

const SidebarControls = styled.div`
  display: flex;
  align-items: center;

  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  @media (min-width: ${breakpoint * 1.333}px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  /* input */
  ${SearchInput} {
    @media (min-width: ${breakpoint * 1.333}px) {
      margin-right: 10px;
      flex: 1;
    }
  }
  /* button */
  > *:nth-child(2) {
    display: none;

    @media (min-width: ${breakpoint * 1.333}px) {
      display: inline-block;
      flex: none;
    }
  }
  /* framework picker */
  > *:nth-child(3) {
    flex: 1;

    @media (min-width: ${breakpoint * 1.333}px) {
      flex: 0 0 100%;
    }
  }

  .algolia-autocomplete .ds-dropdown-menu {
    font-size: 0.8em;
  }

  .algolia-autocomplete a {
    text-decoration: none;
    transition: transform 150ms ease-out, color 150ms ease-out;

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0; /* do not remove  https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow */
  max-width: 800px;
  margin: 0px auto;
`;

const Wrapper = styled.div`
  ${pageMargins}
  padding-bottom: 3rem;

  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    display: flex;
  }
`;

const StyledTableOfContents = styled(TableOfContents)`
  /* Hide ToC on mobile, the primary navigation is search */
  display: none;

  @media (min-width: ${breakpoint * 1.333}px) {
    display: block;
    margin-top: 1.5rem;
    /* So that the expandable arrows are rendered outside of the sidebar dimensions */
    margin-left: -20px;
  }
`;

function DocsLayout({ children, data, pageContext, ...props }) {
  const {
    currentPage: {
      fields: { slug },
    },
  } = data;
  const {
    coreFrameworks,
    communityFrameworks,
    urls: { homepageUrl },
  } = useSiteMetadata();
  const { docsToc, framework } = pageContext;
  const [searchValue, setSearchValue] = useState('');
  const { isSearchVisible } = useAlgoliaSearch({ framework });

  const addLinkWrappers = (items) =>
    items.map((item) => ({
      ...item,
      ...(item.type.match(/link/) && { LinkWrapper: GatsbyLinkWrapper }),
      ...(item.children && { children: addLinkWrappers(item.children) }),
    }));
  const docsTocWithLinkWrappers = addLinkWrappers(docsToc);

  const withTooltipProps = {
    placement: 'top',
    trigger: 'hover',
    hasChrome: false,
    as: 'span',
  };

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <link rel="canonical" href={`${homepageUrl}${buildPathWithFramework(slug, 'react')}`} />
        <meta name="docsearch:framework" content={framework} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
        />
      </Helmet>
      <Wrapper>
        <Sidebar>
          <StyledTableOfContents
            key={framework}
            currentPath={buildPathWithFramework(slug, framework)}
            items={docsTocWithLinkWrappers}
          >
            {({ menu, allTopLevelMenusAreOpen, toggleAllOpen, toggleAllClosed }) => (
              <>
                <SidebarControls>
                  {isSearchVisible ? (
                    <SearchInput
                      id={SEARCH_INPUT_ID}
                      label="Search"
                      hideLabel
                      icon="search"
                      appearance="pill"
                      placeholder="Search docs"
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                    />
                  ) : (
                    <>
                      {/* Placeholder to preserve styling given the input is missing. */}
                      <div style={{ flex: 'none', marginRight: 0 }} />
                    </>
                  )}
                  {allTopLevelMenusAreOpen ? (
                    <WithTooltip
                      {...withTooltipProps}
                      tooltip={<TooltipNote note="Collapse all" />}
                      onClick={toggleAllClosed}
                      tabIndex="-1"
                    >
                      <ExpandButton containsIcon appearance="outline" size="small">
                        <Icon icon="collapse" aria-label="Collapse sidebar" />
                      </ExpandButton>
                    </WithTooltip>
                  ) : (
                    <WithTooltip
                      {...withTooltipProps}
                      tooltip={<TooltipNote note="Expand all" />}
                      onClick={toggleAllOpen}
                      tabIndex="-1"
                    >
                      <ExpandButton containsIcon appearance="outline" size="small">
                        <Icon icon="expandalt" aria-label="Expand sidebar" />
                      </ExpandButton>
                    </WithTooltip>
                  )}

                  <StyledFrameworkSelector
                    currentFramework={framework}
                    slug={slug}
                    coreFrameworks={coreFrameworks}
                    communityFrameworks={communityFrameworks}
                  />
                </SidebarControls>

                {menu}
              </>
            )}
          </StyledTableOfContents>
        </Sidebar>

        <Content>{children}</Content>
      </Wrapper>
    </>
  );
}

export default DocsLayout;

export const query = graphql`
  fragment DocsLayoutCurrentPageQuery on Mdx {
    fields {
      slug
    }
  }
`;
