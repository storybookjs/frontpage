import React from 'react';
import { styled, css } from '@storybook/theming';
import {
  Icon,
  Button,
  TableOfContents,
  TooltipNote,
  WithTooltip,
  global,
  animation,
} from '@storybook/design-system';
import Helmet from 'react-helmet';
import {
  SubNav,
  SubNavTabs,
  SubNavDivider,
  SubNavMenus,
  SubNavRight,
  SubNavLinkList,
  styles,
} from '@storybook/components-marketing';
import { Container } from '@chromaui/tetra';

import { GLOBAL_SEARCH_IMPORTANCE, GLOBAL_SEARCH_META_KEYS } from '../../constants/global-search';
import buildPathWithVersion from '../../util/build-path-with-version';
import GatsbyLinkWrapper from '../basics/GatsbyLinkWrapper';
import useSiteMetadata from '../lib/useSiteMetadata';
import { CodeLanguageSelector } from '../screens/DocsScreen/CodeLanguageSelector';
import { DocsContextProvider } from '../screens/DocsScreen/DocsContext';
import { FrameworkSelector } from '../screens/DocsScreen/FrameworkSelector';
import { VersionSelector } from '../screens/DocsScreen/VersionSelector';
import { VersionCTA } from '../screens/DocsScreen/VersionCTA';

const { breakpoint, color, pageMargins, spacing } = styles;
const { GlobalStyle } = global;

const SubNavWrapper = styled.div`
  background: ${color.lightest};
  position: sticky;
  top: 0;
  z-index: 2;
`;

const Sidebar = styled.div<{ isLoading: boolean }>`
  display: none;
  position: relative;

  @media (min-width: ${breakpoint * 1.333}px) {
    display: block;
    flex: 0 0 240px;
    margin: 0;
    padding-bottom: 0;
    padding-right: 20px;
    margin-right: 20px;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      height: 80vh;
      border-radius: ${spacing.borderRadius.small}px;
      ${animation.inlineGlow}
    `}
`;

const ExpandButton = styled(Button)`
  height: 28px;
  width: 28px;
`;

const SidebarControls = styled.div`
  position: absolute;
  left: -62px;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0; /* do not remove  https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow */
  max-width: 800px;
  margin: 1rem auto 0 auto;

  @media (min-width: ${breakpoint * 1.333}px) {
    margin-top: 0;
  }
`;

const StyledVersionCTA = styled(VersionCTA)`
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  padding-bottom: 3rem;

  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    display: flex;
  }
`;

const StyledTableOfContents = styled(TableOfContents)`
  // space the ToC emoji and text
  li > a svg + span::first-letter,
  li > button svg + span::first-letter {
    margin-right: 4px;
  }

  /* Hide ToC on mobile, the primary navigation is search */
  display: none;

  @media (min-width: ${breakpoint * 1.333}px) {
    display: block;
    /* So that the expandable arrows are rendered outside of the sidebar dimensions */
    margin-left: -20px;
  }
`;

const docsItems = [
  { key: '0', label: 'Guides', href: '/docs', isActive: true },
  { key: '1', label: 'Tutorials', href: 'https://storybook.js.org/tutorials/' },
];

const supportItems = [
  {
    icon: 'github',
    href: 'https://github.com/storybookjs/storybook/issues',
    label: 'Github',
  },
  {
    icon: 'discord',
    href: 'https://discord.gg/storybook',
    label: 'Discord',
  },
  {
    icon: 'youtube',
    href: 'https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg',
    label: 'Youtube',
  },
];

const SkeletonTitle = styled.div`
  height: 36px;
  margin-bottom: 1.5rem;
  width: 75%;
  border-radius: ${spacing.borderRadius.small}px;
  ${animation.inlineGlow}
`;

const SkeletonBody = styled.div`
  height: calc(80vh - 36px - 1.5rem);
  border-radius: ${spacing.borderRadius.small}px;
  ${animation.inlineGlow}
`;

export function PureDocsLayout({ children, isLoading, sidebar, slug, versions: versionsProp }) {
  const { coreFrameworks, communityFrameworks, isLatest, version, versionString } =
    useSiteMetadata();

  const versions = versionsProp || {
    // prettier-ignore
    stable: [{
      version,
      string: versionString,
      label: isLatest ? 'Latest' : undefined,
    }],
    preRelease: [],
  };

  return (
    <>
      <GlobalStyle />
      <DocsContextProvider>
        <SubNavWrapper>
          <SubNav>
            <SubNavTabs label="Docs nav" items={docsItems} />
            <SubNavDivider />
            <SubNavMenus>
              <VersionSelector version={version} versions={versions} slug={slug} />
              {/* TODO: Remove */}
              <FrameworkSelector
                coreFrameworks={coreFrameworks}
                communityFrameworks={communityFrameworks}
              />
              {/* TODO: Remove */}
              <CodeLanguageSelector />
            </SubNavMenus>
            <SubNavRight>
              <SubNavLinkList label="Get support:" items={supportItems} />
            </SubNavRight>
          </SubNav>
        </SubNavWrapper>
        <Container>
          <Wrapper>
            <Sidebar className="sidebar" isLoading={isLoading}>
              {sidebar}
            </Sidebar>
            <Content>
              {isLoading ? (
                <>
                  <SkeletonTitle />
                  <SkeletonBody />
                </>
              ) : (
                children
              )}
            </Content>
          </Wrapper>
        </Container>
      </DocsContextProvider>
    </>
  );
}

const getTocSectionTitles = (toc, path) => {
  const pathParts = path.split('/');
  const title = [];

  const buildTitle = (items, pathPartIndex) => {
    let item = items.find(({ pathSegment }) => pathSegment === pathParts[pathPartIndex]);

    if (!item) {
      /**
       * Some toc items use an empty `pathSegment` to create a menu that isn't reflected in the URL
       * e.g. Configure > Integration > Webpack -> configure/webpack
       * If we can't find a direct match for the current slug segment, we look in these "empty" items
       * (note that there can be more than one!) and try to find a match in their `children`
       */
      items
        .filter(({ pathSegment }) => pathSegment === '')
        .forEach(({ children }) => {
          item =
            children?.find(({ pathSegment }) => pathSegment === pathParts[pathPartIndex]) || item;
        });
    }

    if (item) {
      const { children, title: titlePart } = item;
      if (titlePart) {
        title.push(titlePart);
      }
      if (children) {
        buildTitle(children, pathPartIndex + 1);
      }
    }
  };

  buildTitle(toc, 0);

  return title.join(' » ');
};

function DocsLayout({ children, isLatest: isLatestProp, pageContext }) {
  const {
    urls: { homepageUrl },
    version,
    versionString,
    latestVersion,
    latestVersionString,
    isLatest,
  } = useSiteMetadata();
  const { docsToc, fullPath, slug, versions } = pageContext;

  const tocSectionTitles = getTocSectionTitles(docsToc, slug.split('/docs/')[1]);

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
      <Helmet>
        {isLatest && (
          <link
            rel="canonical"
            href={`${homepageUrl}${buildPathWithVersion(slug, latestVersionString)}/`}
          />
        )}
        <meta
          key={GLOBAL_SEARCH_META_KEYS.VERSION}
          name={GLOBAL_SEARCH_META_KEYS.VERSION}
          content={versionString}
        />
        <meta
          key={GLOBAL_SEARCH_META_KEYS.IMPORTANCE}
          name={GLOBAL_SEARCH_META_KEYS.IMPORTANCE}
          content={GLOBAL_SEARCH_IMPORTANCE.DOCS}
        />
      </Helmet>
      <PureDocsLayout
        slug={slug}
        sidebar={
          // TODO: Sidebar
          <StyledTableOfContents currentPath={fullPath} items={docsTocWithLinkWrappers}>
            {({ menu, allTopLevelMenusAreOpen, toggleAllOpen, toggleAllClosed }) => (
              <>
                <SidebarControls>
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
                </SidebarControls>
                {menu}
              </>
            )}
          </StyledTableOfContents>
        }
        versions={versions}
      >
        {tocSectionTitles && (
          <span hidden id="toc-section-titles">
            {`Docs » ${tocSectionTitles}`}
          </span>
        )}
        {(isLatestProp === false || !isLatest) && (
          <StyledVersionCTA
            version={version}
            latestVersion={latestVersion}
            latestVersionString={latestVersionString}
            versions={versions}
            slug={slug}
          />
        )}
        {children}
      </PureDocsLayout>
    </>
  );
}

export default DocsLayout;
