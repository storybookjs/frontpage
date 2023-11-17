import React, { FC } from 'react';
import { styled } from '@storybook/theming';
import { global } from '@storybook/design-system';
import Helmet from 'react-helmet';
import { Container, color, minMd, minSm, spacing } from '@chromaui/tetra';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import {
  GLOBAL_SEARCH_IMPORTANCE,
  GLOBAL_SEARCH_META_KEYS,
} from '../../../constants/global-search';
import {
  HEADER_HEIGHT,
  HEADER_HEIGHT_WITH_EYEBROW,
  SCROLL_CHANNEL_WIDTH,
  SCROLL_THUMB_WIDTH,
} from '../../../constants/style';
import buildPathWithVersion from '../../../util/build-path-with-version';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { DocsContextProvider } from '../../screens/DocsScreen/DocsContext';
import { VersionCTA } from '../../screens/DocsScreen/VersionCTA';
import { Sidebar } from './Sidebar';

const { GlobalStyle } = global;

export const GUTTER = spacing[8];
const OPTICAL_ALIGNMENT_WITH_LOGO = '7px';
const FOCUS_OUTLINE_WIDTH = '2px';
export const DOCS_TOP_PADDING = '24px';
export const DOCS_TOP_PADDING_WIDE = '48px';
export const DOCS_BOTTOM_PADDING = '24px';
export const DOCS_BOTTOM_PADDING_WIDE = '48px';
export const SIDEBAR_WIDTH = '240px';

const BubblesBackground = styled.img`
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

const Wrapper = styled.div`
  padding-top: ${HEADER_HEIGHT};

  @media (min-width: 440px) {
    padding-top: ${HEADER_HEIGHT_WITH_EYEBROW};
  }

  ${minSm} {
    display: flex;
    gap: calc(${GUTTER} - ${SCROLL_CHANNEL_WIDTH} + ${OPTICAL_ALIGNMENT_WITH_LOGO});
  }
`;

const SidebarContainer = styled.div`
  display: none;

  ${minMd} {
    display: block;
    position: sticky;
    top: ${HEADER_HEIGHT_WITH_EYEBROW};
    align-self: flex-start;
  }
`;

const SidebarRoot = styled(ScrollArea.Root)`
  position: relative;
  left: calc(${OPTICAL_ALIGNMENT_WITH_LOGO} - ${FOCUS_OUTLINE_WIDTH});
  width: ${SIDEBAR_WIDTH};
  height: calc(100vh - ${HEADER_HEIGHT_WITH_EYEBROW});
`;

const SidebarViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  padding-top: ${DOCS_TOP_PADDING_WIDE};
  padding-bottom: ${DOCS_BOTTOM_PADDING_WIDE};
  padding-right: ${SCROLL_CHANNEL_WIDTH};
  padding-left: ${FOCUS_OUTLINE_WIDTH};
`;

const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  width: ${SCROLL_THUMB_WIDTH};
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;
  padding-top: ${DOCS_TOP_PADDING_WIDE};
  padding-bottom: ${DOCS_BOTTOM_PADDING_WIDE};
`;

const ScrollAreaThumb = styled(ScrollArea.Thumb)`
  flex: 1;
  width: ${SCROLL_THUMB_WIDTH};
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
  min-width: 0;
  padding-top: ${DOCS_TOP_PADDING};
  padding-bottom: ${DOCS_BOTTOM_PADDING};

  ${minMd} {
    padding-top: ${DOCS_TOP_PADDING_WIDE};
    padding-bottom: ${DOCS_BOTTOM_PADDING_WIDE};
  }
`;

const StyledVersionCTA = styled(VersionCTA)`
  margin-bottom: 24px;
`;

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

  React.useEffect(() => {
    console.log('DOCSLAYOUT Mounted', { docsToc, slug });
  }, []);

  console.log('DOCSLAYOUT - updated', { docsToc, slug });

  const tocSectionTitles = getTocSectionTitles(docsToc, slug.split('/docs/')[1]);

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
      <GlobalStyle />
      <DocsContextProvider>
        <Container>
          <Wrapper>
            <SidebarContainer>
              <SidebarRoot className="sidebar">
                <SidebarViewport>
                  <Sidebar docsToc={docsToc} versions={versions} slug={slug} />
                </SidebarViewport>
                <ScrollAreaScrollbar orientation="vertical">
                  <ScrollAreaThumb />
                </ScrollAreaScrollbar>
              </SidebarRoot>
            </SidebarContainer>
            <Content>
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
            </Content>
          </Wrapper>
        </Container>
        <BubblesBackground src="/images/bubbles.jpg" alt="Storybook" />
      </DocsContextProvider>
    </>
  );
};

export default DocsLayout;
