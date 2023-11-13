import React, { FC } from 'react';
import { styled } from '@storybook/theming';
import { global } from '@storybook/design-system';
import Helmet from 'react-helmet';
import { Container, color, minMd } from '@chromaui/tetra';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { GLOBAL_SEARCH_IMPORTANCE, GLOBAL_SEARCH_META_KEYS } from '../../constants/global-search';
import buildPathWithVersion from '../../util/build-path-with-version';
import GatsbyLinkWrapper from '../basics/GatsbyLinkWrapper';
import useSiteMetadata from '../lib/useSiteMetadata';
import { DocsContextProvider } from '../screens/DocsScreen/DocsContext';
import { VersionCTA } from '../screens/DocsScreen/VersionCTA';
import { Sidebar } from './sidebar/Sidebar';

const { GlobalStyle } = global;

const BubblesBackground = styled.img`
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

const Wrapper = styled.div`
  ${minMd} {
    padding-top: 112px;
    display: flex;
  }
`;

const SidebarContainer = styled.div`
  display: none;

  ${minMd} {
    display: block;
    position: sticky;
    top: 112px;
    align-self: flex-start;
  }
`;

const SidebarRoot = styled(ScrollArea.Root)`
  position: relative;

  ${minMd} {
    width: 260px;
    margin: 0;
    padding-bottom: 0;
    padding-right: 20px;
    margin-right: 20px;
    height: calc(100vh - 112px);
  }
`;

const SidebarViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  padding-top: 48px;
`;

const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  width: 5px;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;
  padding-top: 48px;
  padding-bottom: 24px;
`;

const ScrollAreaThumb = styled(ScrollArea.Thumb)`
  flex: 1;
  width: 5px;
  background: ${color.slate300};
  border-radius: 20px;
  position: relative;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${color.slate500};
  }
`;

const Content = styled.div`
  flex: 1;
  margin: 1rem auto 0 auto;

  ${minMd} {
    margin-top: 0;
    padding-top: 48px;
    padding-bottom: 48px;
  }
`;

const StyledVersionCTA = styled(VersionCTA)`
  margin-bottom: 24px;
`;

interface PureDocsLayoutProps {
  sidebar: React.ReactNode;
}

export const PureDocsLayout: FC<PureDocsLayoutProps> = ({ children, sidebar }) => {
  return (
    <>
      <GlobalStyle />
      <DocsContextProvider>
        <Container>
          <Wrapper>
            <SidebarContainer>
              <SidebarRoot className="sidebar">
                <SidebarViewport>{sidebar}</SidebarViewport>
                <ScrollAreaScrollbar orientation="vertical">
                  <ScrollAreaThumb />
                </ScrollAreaScrollbar>
              </SidebarRoot>
            </SidebarContainer>
            <Content>{children}</Content>
          </Wrapper>
        </Container>
        <BubblesBackground src="/images/bubbles.jpg" alt="Storybook" />
      </DocsContextProvider>
    </>
  );
};

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

interface DocsLayoutProps {
  children: React.ReactNode;
  isLatest?: boolean;
  pageContext: any;
}

const DocsLayout: FC<DocsLayoutProps> = ({ children, isLatest: isLatestProp, pageContext }) => {
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
        sidebar={
          <Sidebar
            docsTocWithLinkWrappers={docsTocWithLinkWrappers}
            versions={versions}
            slug={slug}
          />
        }
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
};

export default DocsLayout;
