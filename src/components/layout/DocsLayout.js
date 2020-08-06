import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  Icon,
  Input,
  Link,
  StyledButton,
  TableOfContents,
  TooltipNote,
  WithTooltip,
  global,
  styles,
} from '@storybook/design-system';
import { graphql } from 'gatsby';

import { SocialGraph } from '../basics';
import GatsbyLinkWrapper from '../basics/GatsbyLinkWrapper';

import { contentLeftPadding, contentRightPadding } from '../screens/DocsScreen/DocsScreen';

const { breakpoint, color, pageMargins, typography } = styles;
const { GlobalStyle } = global;

const bottomSpacing = css`
  padding-bottom: 3rem;
`;

const Sidebar = styled.div`
  position: sticky;
  padding-top: 10px;
  padding-right: 20px;
  margin-right: 56px;
  margin-top: -10px;
  top: 0;
  max-height: 100vh;
  width: 276px;
  min-width: 276px;
  overflow: scroll;
  ${bottomSpacing}

  @media (max-width: ${breakpoint * 1.333 - 1}px) {
    flex: none;
    margin: 1rem 0 2rem;
    width: 100%;
    border-bottom: 1px solid ${color.mediumlight};
  }
`;

const SidebarControls = styled.div`
  display: flex;
`;

const Content = styled.div`
  ${bottomSpacing}
  overflow: hidden;
  margin-left: -${contentLeftPadding}px;
  margin-right: -${contentRightPadding}px;
`;

const Wrapper = styled.div`
  ${pageMargins}

  && {
    padding-bottom: 0;
  }

  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    display: flex;
  }
`;

const StyledTableOfContents = styled(TableOfContents)`
  margin-top: 32px;
`;

const ExpandCollapseButton = styled(StyledButton).attrs({ appearance: 'outline' })`
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 10px;

  svg {
    width: 10px;
    height: 10px;
    margin: 0;

    &:last-of-type {
      margin-top: -2px;
    }
  }
`;

function DocsLayout({ children, data, pageContext, ...props }) {
  const {
    currentPage: {
      fields: { slug },
    },
  } = data;
  const { docsToc, tocItem, nextTocItem } = pageContext;

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
    as: ExpandCollapseButton,
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Sidebar>
          <StyledTableOfContents currentPath={slug} items={docsTocWithLinkWrappers}>
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
                    >
                      <>
                        <Icon icon="arrowdown" />
                        <Icon icon="arrowup" />
                      </>
                    </WithTooltip>
                  ) : (
                    <WithTooltip
                      {...withTooltipProps}
                      tooltip={<TooltipNote note="Expand all" />}
                      onClick={toggleAllOpen}
                    >
                      <>
                        <Icon icon="arrowup" />
                        <Icon icon="arrowdown" />
                      </>
                    </WithTooltip>
                  )}
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
