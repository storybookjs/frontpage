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
  flex: 0 1 240px;
  padding-right: 20px;

  @media (max-width: ${breakpoint * 1.333 - 1}px) {
    flex: none;
    margin: 1rem 0 2rem;
    width: 100%;
    border-bottom: 1px solid ${color.mediumlight};
  }
`;

const SidebarControls = styled.div`
  display: flex;

  /* the input */
  > :first-child {
    margin-right: 10px;
  }
`;

const Content = styled.div`
  flex: 1;
  max-width: 800px;
  margin: 0px auto;
`;

const Wrapper = styled.div`
  ${pageMargins}

  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    display: flex;
  }
`;

const StyledTableOfContents = styled(TableOfContents)`
  margin-top: 2rem;
  /* So that the expandable arrows are rendered outside of the sidebar dimensions */
  margin-left: -20px;
`;

const StyledFrameworkSelector = styled(FrameworkSelector)`
  margin-top: 32px;
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
                </SidebarControls>

                <StyledFrameworkSelector
                  currentFramework={framework}
                  slug={slug}
                  frameworks={frameworks}
                />

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
