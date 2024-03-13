import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import { styled, css } from '@storybook/theming';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { color, spacing } from '@chromaui/tetra';
import { Button, Link, ShadowBoxCTA, Subheading, styles } from '@storybook/design-system';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { HEADER_HEIGHT, SCROLL_CHANNEL_WIDTH, SCROLL_THUMB_WIDTH } from '../../../constants/style';
import { useMediaQuery } from '../../lib/useMediaQuery';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { mdFormatting } from '../../../styles/formatting';
import stylizeRenderer from '../../../util/stylize-renderer';
import buildPathWithVersion from '../../../util/build-path-with-version';
import relativeToRootLinks from '../../../util/relative-to-root-links';
import { SocialGraph } from '../../basics';
import { Callout } from '../../basics/Callout';
import { InPageTOC } from '../../basics/InPageTOC';
import { Pre } from '../../basics/Pre';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { SyntaxHighlighterContextProvider } from '../../basics/CodeSnippets/SyntaxHighlighterContext';
import {
  DOCS_BOTTOM_PADDING_WIDE,
  DOCS_TOP_PADDING_WIDE,
  GUTTER,
} from '../../layout/DocsLayout/DocsLayout';
import { CodeSnippets } from './CodeSnippets/CodeSnippets';
import { useDocsContext } from './DocsContext';
import { FeatureSnippets } from './FeatureSnippets';
import { Feedback } from './Feedback';
import { If } from './If';
import { RendererSelector } from './RendererSelector';
import { rendererSupportsFeature, RendererSupportTable } from './RendererSupportTable';
import { YouTubeCallout } from './YouTubeCallout';

const { color: dsColor, spacing: dsSpacing, typography } = styles;

const MIN_HEADINGS_COUNT_FOR_TOC = 1;

/**
 * Note: This breakpoint should be revisited.
 * - It provides a minimum width of 600px for the content area.
 * - The rest of the SB properties (and the prior design of docs) use a 2-col width. To maintain a
 *   legible line length, the left/right margins of the page layout (codified in Nav from
 *   `components-marketing` and Container from `tetra`) increase at 1200px. But that doesn't leave
 *   much available width for a 3-column layout, resulting in this rather wide breakpoint.
 * - To reduce this breakpoint (making the InPageTOC visible for more users), we'd need to either:
 *   a. Change the page layout for _just_ the docs, resulting in a different layout from the other
 *      SB properties
 *   b. Change the page layout for all SB properties, resulting in longer line lengths or necessary
 *      layout adjustments in some places
 */
export const IS_2_COL_BREAKPOINT = 1510;

const RIGHT_RAIL_WIDTH = '220px';

const Root = styled('div', {
  shouldForwardProp: (prop) => prop !== 'hasRightRail',
})<{ hasRightRail: boolean }>`
  ${({ hasRightRail }) =>
    hasRightRail &&
    css`
      display: flex;
      flex-direction: row-reverse;
      gap: ${GUTTER};
    `}
`;

const Header = styled.div`
  margin-bottom: ${spacing[8]};
`;

const RightRail = styled.div`
  flex: 0 0 ${RIGHT_RAIL_WIDTH};
  position: relative;
  top: -${DOCS_TOP_PADDING_WIDE};
`;

const RightRailSticky = styled.div`
  position: sticky;
  top: ${HEADER_HEIGHT};
`;

const RightRailRoot = styled(ScrollArea.Root)`
  position: relative;
  width: ${RIGHT_RAIL_WIDTH};
  height: calc(100vh - ${HEADER_HEIGHT});
`;

const RightRailViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  padding-top: ${DOCS_TOP_PADDING_WIDE};
  padding-bottom: ${DOCS_BOTTOM_PADDING_WIDE};
  padding-right: ${SCROLL_CHANNEL_WIDTH};
`;

const RightRailScrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  width: ${SCROLL_THUMB_WIDTH};
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;
  padding-top: ${DOCS_TOP_PADDING_WIDE};
  padding-bottom: ${DOCS_BOTTOM_PADDING_WIDE};
`;

const RightRailThumb = styled(ScrollArea.Thumb)`
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
  flex: 1 1 auto;
  min-width: 0;
`;

const MDWrapper = styled.main`
  ${mdFormatting}
`;

const Title = styled.h1`
  font-size: ${typography.size.l1}px;
  font-weight: ${typography.weight.bold};

  line-height: 36px;
  margin-bottom: 1.5rem;

  & + * {
    margin-top: 0 !important;
  }
`;

const NextSubheading = styled(Subheading)`
  color: ${dsColor.mediumdark};
  font-size: ${typography.size.s2}px;
  display: block;
  margin-bottom: 1rem;
`;

const NextNavigation = styled.div`
  margin-top: 3rem;
`;

const GithubLinkItem = styled(Link)`
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s2}px;
`;

const UnsupportedBanner = styled.div`
  margin: 26px 0;
  border-radius: ${dsSpacing.borderRadius.small}px;
  background-color: #fff5cf;
  padding: 20px;
`;

const Contribute = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 3rem;
`;

/*
 * Checks for a given number of elements at a given interval and runs callback, if all found.
 * If not found by given timeout, runs callback anyway.
 */
function waitForElementsToDisplay(
  selector,
  numElements,
  callback,
  checkFrequencyInMs,
  timeoutInMs
) {
  const startTimeInMs = Date.now();
  (function loopSearch(shouldContinue = true) {
    if (!shouldContinue) return;
    if (
      document.querySelectorAll(selector) != null &&
      document.querySelectorAll(selector).length === numElements
    ) {
      callback();
    } else {
      setTimeout(() => {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) {
          callback();
          loopSearch(false);
          return;
        }
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}

function DocsScreen({ data, pageContext, location }) {
  const {
    currentPage: {
      body,
      frontmatter: { hideRendererSelector, title },
      tableOfContents,
    },
  } = data;
  const pageTocItems = tableOfContents?.items || [];

  const hasHeadings =
    pageTocItems.flatMap((item) => (item.items ? [item, ...item.items] : item)).length >
    MIN_HEADINGS_COUNT_FOR_TOC;
  const [is2Col] = useMediaQuery(`(min-width: ${IS_2_COL_BREAKPOINT}px)`);
  const hasRightRail = is2Col && hasHeadings;

  const {
    allRenderers,
    coreRenderers,
    communityRenderers,
    description,
    featureGroups,
    urls: { homepageUrl },
    versionString,
  } = useSiteMetadata();
  const { docsToc, fullPath, slug, tocItem, nextTocItem } = pageContext;

  const {
    codeLanguage: [codeLanguage],
    renderer: [renderer],
    packageManager: [packageManager],
  } = useDocsContext();

  const CodeSnippetsWithState = useMemo(() => {
    return (props) => (
      <CodeSnippets
        currentRenderer={renderer}
        currentCodeLanguage={codeLanguage}
        currentPackageManager={packageManager}
        {...props}
      />
    );
  }, [renderer, codeLanguage, packageManager]);
  const FeatureSnippetsWithState = useMemo(() => {
    return (props) => <FeatureSnippets currentFramework={renderer} {...props} />;
  }, [renderer]);
  const RendererSupportTableWithState = useMemo(() => {
    return ({ core }) => (
      <RendererSupportTable
        renderers={core ? coreRenderers : communityRenderers}
        currentRenderer={renderer}
        featureGroups={featureGroups}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderer]);
  const LinksWithPrefix = useMemo(() => {
    const isIndexPage = tocItem.type === 'heading' && !tocItem.redirectPath;
    return ({ children, href, ...props }) => {
      const url = relativeToRootLinks(href, location.pathname, isIndexPage);
      return (
        <a href={url} {...props}>
          {children}
        </a>
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderer]);
  const IfWithState = useMemo(() => {
    return (props) => <If allRenderers={allRenderers} currentRenderer={renderer} {...props} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderer]);

  const features = featureGroups.flatMap((group) => group.features);
  const feature = features.find((fs) => `/docs${fs.path}/` === slug);
  const unsupported = feature && !rendererSupportsFeature(renderer, feature);

  let featureSupportItem;
  const findFeatureSupportTocItem = (tocItems) =>
    tocItems.forEach((item) => {
      if (item.pathSegment && item.pathSegment.match(/feature-support/)) {
        featureSupportItem = item;
      }

      if (item.children) {
        findFeatureSupportTocItem(item.children);
      }
    });
  findFeatureSupportTocItem(docsToc);

  const { href, hash } = location;
  const numCodeSnippets = React.useMemo(
    () => body.match(/mdx\(CodeSnippets/g)?.length || 0,
    /*
     * The actual dependency is `body`, but that could be a huge string, so an
     * identity check could be expensive. Instead, we check on the pathname,
     * which is 1:1 to the body, unless editing a page's content, which only
     * happens at dev time.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  );
  React.useEffect(() => {
    if (numCodeSnippets > 0 && hash) {
      document.querySelector('[data-active-target]')?.removeAttribute('data-active-target');

      // Wait for whichever happens first: all snippets on the page to render or 500ms
      waitForElementsToDisplay(
        '[id^=snippet]',
        numCodeSnippets,
        () => {
          const element = document.querySelector(hash);
          element?.setAttribute('data-active-target', 'true');
          element?.scrollIntoView();
        },
        50,
        500
      );
    }
  }, [href, hash, numCodeSnippets]);

  return (
    <>
      <SocialGraph
        url={`${homepageUrl}${fullPath}/`}
        title={`${title} • Storybook docs`}
        desc={description}
      />
      <Root hasRightRail={hasRightRail}>
        {hasRightRail && (
          <RightRail>
            <RightRailSticky>
              <RightRailRoot>
                <RightRailViewport>
                  <InPageTOC items={pageTocItems} />
                </RightRailViewport>
                <RightRailScrollbar orientation="vertical">
                  <RightRailThumb />
                </RightRailScrollbar>
              </RightRailRoot>
            </RightRailSticky>
          </RightRail>
        )}
        <Content>
          <Header>
            <Title>{title}</Title>
            {!hideRendererSelector && (
              <RendererSelector
                coreRenderers={coreRenderers}
                communityRenderers={communityRenderers}
              />
            )}
            {unsupported && (
              <UnsupportedBanner>
                This feature is not supported in {stylizeRenderer(renderer)} yet. Help the open
                source community by contributing a PR.
                {featureSupportItem && (
                  <>
                    {' '}
                    <Link LinkWrapper={GatsbyLinkWrapper} href={featureSupportItem.path} withArrow>
                      View feature coverage by renderer
                    </Link>
                  </>
                )}
              </UnsupportedBanner>
            )}
          </Header>

          <MDWrapper>
            <SyntaxHighlighterContextProvider>
              <MDXProvider
                components={{
                  pre: Pre,
                  CodeSnippets: CodeSnippetsWithState,
                  FeatureSnippets: FeatureSnippetsWithState,
                  RendererSupportTable: RendererSupportTableWithState,
                  // Maintained for older docs version content
                  FrameworkSupportTable: RendererSupportTableWithState,
                  If: IfWithState,
                  // Maintained for older docs version content
                  IfRenderer: IfWithState,
                  YouTubeCallout,
                  a: LinksWithPrefix,
                  Callout,
                }}
              >
                <MDXRenderer>{body}</MDXRenderer>
              </MDXProvider>
            </SyntaxHighlighterContextProvider>
          </MDWrapper>

          {nextTocItem && (
            <NextNavigation>
              <NextSubheading>Next</NextSubheading>
              <ShadowBoxCTA
                action={
                  <Button
                    appearance="secondary"
                    href={buildPathWithVersion(nextTocItem.path)}
                    ButtonWrapper={GatsbyLinkWrapper}
                  >
                    Continue
                  </Button>
                }
                headingText={nextTocItem.title}
                messageText={nextTocItem.description}
              />
            </NextNavigation>
          )}

          <Contribute>
            {tocItem && (
              <Feedback
                key={fullPath}
                slug={slug}
                version={versionString}
                renderer={renderer}
                codeLanguage={codeLanguage}
              />
            )}
            {tocItem && tocItem.githubUrl && (
              <GithubLinkItem tertiary href={tocItem.githubUrl} target="_blank" rel="noopener">
                <span role="img" aria-label="write">
                  ✍️
                </span>{' '}
                Edit on GitHub – PRs welcome!
              </GithubLinkItem>
            )}
          </Contribute>
        </Content>
      </Root>
    </>
  );
}

export default DocsScreen;

export const query = graphql`
  query DocsScreenQuery($slug: String!) {
    currentPage: mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        hideRendererSelector
      }
      tableOfContents
    }
  }
`;
