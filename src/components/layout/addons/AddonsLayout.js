import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pluralize from 'pluralize';
import { Input, TableOfContents, global, styles, TagList, TagLink } from '@storybook/design-system';
import { graphql } from 'gatsby';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { AddonsLearn } from './AddonsLearn';
import { AddonsList } from './AddonsList';
import { AddonsAside, AddonsAsideTitle } from './AddonsAside';

const { breakpoint, spacing, color, pageMargins, typography } = styles;
const { GlobalStyle } = global;

const Content = styled.main`
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
    display: ${(props) => (props.searchLayout ? 'block' : 'flex')};
  }
`;

const Divider = styled.div`
  border-top: 1px solid ${color.border};
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Sidebar = styled.div`
  flex: 1;
  margin: 1rem 0 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${color.border};
  display: ${(props) => (props.hideSidebar ? 'none' : 'block')};
  margin-bottom: 32px;

  @media (min-width: ${breakpoint * 1.333}px) {
    flex: 0 0 240px;
    margin-top: 0;
    margin-top: 0;
    margin-left: auto;
    margin-right: ${(props) => (props.searchLayout ? 'auto' : '20px')};
    margin-bottom: ${(props) => (props.searchLayout ? spacing.padding.medium : 0)}px;
    padding-bottom: 0;
    padding-right: ${(props) => (props.searchLayout ? 0 : 20)}px;
    border-bottom: none;
  }
`;

Sidebar.propTypes = {
  hideSidebar: PropTypes.bool.isRequired,
};

const ToCContent = styled.div`
  /* Hide ToC on mobile, the primary navigation is search */
  display: none;

  ${(props) =>
    props.hideToC
      ? `
          display: none;
        `
      : `
          @media (min-width: ${breakpoint * 1.333}px) {
            display: block;
            margin-top: 1.5rem;
          }
        `}
`;

ToCContent.propTypes = {
  hideToC: PropTypes.bool.isRequired,
};

const SearchContainer = styled.div`
  display: flex;
`;

const StyledAddonsList = styled(AddonsList)`
  flex: 1 1 auto;
`;

const RelatedTagsList = styled(TagList)`
  margin-bottom: 48px;
`;

const SearchInput = styled(Input)`
  flex: 1 1 auto;

  @media (min-width: ${breakpoint * 1.333}px) {
    max-width: 220px;
    margin-right: ${(props) => (props.searchLayout ? 40 : 0)}px;
  }
`;

const Searchbar = styled.div`
  display: flex;
`;

const SearchSummary = styled.div`
  font-size: ${typography.weight.black};
  line-height: 28px;
  color: ${color.darkest};
`;

export const SEARCH_INPUT_ID = 'addons-search';

const sidebarItems = [
  {
    title: '⭐️  Popular',
    path: '/addons/popular/',
    type: 'link',
    LinkWrapper: GatsbyLinkWrapper,
  },
  {
    title: '🧩  Essentials',
    path: '/addons/essentials/',
    type: 'link',
    LinkWrapper: GatsbyLinkWrapper,
  },
  {
    title: '🛠  Code',
    path: '/addons/code/',
    type: 'link',
    LinkWrapper: GatsbyLinkWrapper,
  },
  {
    title: '⚡️  Data & state',
    path: '/addons/data-state/',
    type: 'link',
    LinkWrapper: GatsbyLinkWrapper,
  },
  {
    title: '💅  Style',
    path: '/addons/style/',
    type: 'link',
    LinkWrapper: GatsbyLinkWrapper,
  },
  {
    title: '🎨  Design',
    path: '/addons/design/',
    type: 'link',
    LinkWrapper: GatsbyLinkWrapper,
  },
  {
    title: '⚙️  Appearance',
    path: '/addons/appearance/',
    type: 'link',
    LinkWrapper: GatsbyLinkWrapper,
  },
  {
    title: '🗄  Organize',
    path: '/addons/organize/',
    type: 'link',
    LinkWrapper: GatsbyLinkWrapper,
  },
];

function AddonsLayout({
  children,
  data,
  pageContext,
  hideSidebar,
  searchQuery,
  searchResults,
  ...props
}) {
  const {
    currentPage: {
      fields: { slug },
    },
  } = data;

  // TODO: connect to back-end
  const searching = !!(searchQuery && searchQuery !== '');

  return (
    <>
      <GlobalStyle />
      <Wrapper searchLayout={searching}>
        <Sidebar hideSidebar={hideSidebar} searchLayout={searching}>
          <Searchbar>
            <SearchInput
              searchLayout={searching}
              id={SEARCH_INPUT_ID}
              label="Search"
              hideLabel
              icon="search"
              appearance="pill"
              placeholder="Search addons"
              value={searchQuery}
              onChange={() => {}}
            />
            {searching && searchResults.addons && (
              <SearchSummary>
                {pluralize('addons', searchResults.addons.length, true)}
              </SearchSummary>
            )}
          </Searchbar>
          <TableOfContents currentPath={slug} items={sidebarItems}>
            {({ menu }) => (
              <ToCContent hideToC={searching}>
                {menu}
                <Divider />
                <AddonsLearn />
              </ToCContent>
            )}
          </TableOfContents>
        </Sidebar>

        {searching ? (
          <SearchContainer {...props}>
            <StyledAddonsList addonItems={searchResults.addons} />
            <AddonsAside>
              <AddonsAsideTitle>Related tags</AddonsAsideTitle>
              <RelatedTagsList
                limit={6}
                tags={searchResults.relatedTags.map((tag) => (
                  <TagLink key={tag.link} href={tag.link}>
                    {tag.name}
                  </TagLink>
                ))}
                isLoading={searchResults.relatedTags?.length === 0}
              />
            </AddonsAside>
          </SearchContainer>
        ) : (
          <Content {...props}>children</Content>
        )}
      </Wrapper>
    </>
  );
}

AddonsLayout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({}),
  pageContext: PropTypes.shape({}),
  hideSidebar: PropTypes.bool,
};

AddonsLayout.defaultProps = {
  hideSidebar: false,
  data: {},
  pageContext: {},
};

export default AddonsLayout;

export const query = graphql`
  fragment DocsLayoutCurrentPageQuery on Mdx {
    fields {
      slug
    }
  }
`;
