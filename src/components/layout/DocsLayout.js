import React from 'react';
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

import { SocialGraph } from '../basics';
import GatsbyLinkWrapper from '../basics/GatsbyLinkWrapper';

import useSiteMetadata from '../lib/useSiteMetadata';
import buildPathWithFramework from '../../util/build-path-with-framework';
import { FrameworkSelector } from '../screens/DocsScreen/FrameworkSelector';
import stylizeFramework from '../../util/stylize-framework';

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
  > *:nth-child(1) {
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
  const { frameworks } = useSiteMetadata();
  const { docsToc, framework } = pageContext;

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
                  <Input
                    id="search"
                    label="Search"
                    hideLabel
                    icon="search"
                    appearance="pill"
                    placeholder="Search docs"
                  />
                  {allTopLevelMenusAreOpen ? (
                    <WithTooltip
                      {...withTooltipProps}
                      tooltip={<TooltipNote note="Collapse all" />}
                      onClick={toggleAllClosed}
                      tabIndex="-1"
                    >
                      <Button containsIcon appearance="outline" size="small">
                        <Icon icon="collapse" aria-label="Collapse sidebar" />
                      </Button>
                    </WithTooltip>
                  ) : (
                    <WithTooltip
                      {...withTooltipProps}
                      tooltip={<TooltipNote note="Expand all" />}
                      onClick={toggleAllOpen}
                      tabIndex="-1"
                    >
                      <Button containsIcon appearance="outline" size="small">
                        <Icon icon="expandalt" aria-label="Expand sidebar" />
                      </Button>
                    </WithTooltip>
                  )}

                  <StyledFrameworkSelector
                    currentFramework={framework}
                    slug={slug}
                    frameworks={frameworks}
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
