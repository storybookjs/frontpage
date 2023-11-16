import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import { styled, css } from '@storybook/theming';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { color, spacing } from '@chromaui/tetra';
import { Button, Link, ShadowBoxCTA, Subheading, styles } from '@storybook/design-system';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { CodeSnippets } from './CodeSnippets';
import { rendererSupportsFeature, RendererSupportTable } from './RendererSupportTable';
import { SocialGraph } from '../../basics';
import { Callout } from '../../basics/Callout';
import { InPageTOC } from '../../basics/InPageTOC';
import { Pre } from '../../basics/Pre';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { useMediaQuery } from '../../lib/useMediaQuery';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { mdFormatting } from '../../../styles/formatting';
import buildPathWithVersion from '../../../util/build-path-with-version';
import relativeToRootLinks from '../../../util/relative-to-root-links';
import stylizeRenderer from '../../../util/stylize-renderer';
import { useDocsContext } from './DocsContext';
import { FeatureSnippets } from './FeatureSnippets';
import { Feedback } from './Feedback';
import { If } from './If';
import { RendererSelector } from './RendererSelector';
import { YouTubeCallout } from './YouTubeCallout';

const { color: dsColor, spacing: dsSpacing, typography } = styles;

const MIN_HEADINGS_COUNT_FOR_TOC = 3;

/**
 * TODO: This breakpoint is a compromise:
 * - Nav from `components-marketing` and `Container` from `tetra` both apply a bigger margin at
 *   wider viewports, which results in a too narrow overall available width
 * - That worked fine for a 1-col content layout, but does not work for a 2-col layout
 */
const IS_2_COL_BREAKPOINT = 1400;

// Magic number to account for PageLayout header height
const IN_PAGE_TOC_TOP_OFFSET = 112;

const Root = styled('div', {
  shouldForwardProp: (prop) => prop !== 'hasRightRail',
})<{ hasRightRail: boolean }>`
  ${({ hasRightRail }) =>
    hasRightRail &&
    css`
      @media (min-width: ${IS_2_COL_BREAKPOINT}px) {
        display: grid;
        grid-template-columns: 1fr 240px;
        grid-template-rows: repeat(2, min-content);
        grid-column-gap: ${spacing[8]};
      }
    `}
`;

const Header = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  margin-bottom: ${spacing[8]};
`;

const RightRail = styled.div`
  margin-bottom: ${spacing[8]};
  grid-area: 1 / 2 / 3 / 3;

  @media (min-width: ${IS_2_COL_BREAKPOINT}px) {
    position: relative;
    top: -48px;
  }
`;

const RightRailSticky = styled.div`
  position: sticky;
  top: ${IN_PAGE_TOC_TOP_OFFSET}px;
`;

const RightRailRoot = styled(ScrollArea.Root)`
  position: relative;
  width: 240px;
  margin: 0;
  padding-bottom: 0;
  padding-right: 20px;
  margin-right: 20px;
  height: calc(100vh - ${IN_PAGE_TOC_TOP_OFFSET}px);
`;

const RightRailViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  padding-top: 48px;
`;

const RightRailScrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  width: 5px;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;
  padding-top: 48px;
  padding-bottom: 24px;
`;

const RightRailThumb = styled(ScrollArea.Thumb)`
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
  grid-area: 2 / 1 / 3 / 2;
  min-width: 0;
`;

const MDWrapper = styled.main`
  ${mdFormatting}
  flex: 1;
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
      frontmatter: { title },
      tableOfContents,
    },
  } = data;
  const pageTocItems = tableOfContents?.items || [];

  const hasHeadings =
    pageTocItems.flatMap((item) => (item.items ? [item, ...item.items] : item)).length >
    MIN_HEADINGS_COUNT_FOR_TOC;

  const {
    allRenderers,
    coreRenderers,
    communityRenderers,
    description,
    featureGroups,
    urls: { homepageUrl },
    versionString,
  } = useSiteMetadata();
  const { docsToc, fullPath, slug, tocItem, nextTocItem, isInstallPage } = pageContext;

  const {
    codeLanguage: [codeLanguage],
    renderer: [renderer],
  } = useDocsContext();

  const [is2Col] = useMediaQuery(`(min-width: ${IS_2_COL_BREAKPOINT}px)`);

  const CodeSnippetsWithState = useMemo(() => {
    return (props) => (
      <CodeSnippets currentFramework={renderer} currentCodeLanguage={codeLanguage} {...props} />
    );
  }, [renderer, codeLanguage]);
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
    return ({ children, href, ...props }) => {
      const url = relativeToRootLinks(href, location.pathname);
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
      // Wait for whichever happens first: all snippets on the page to render or 500ms
      waitForElementsToDisplay(
        '[id^=snippet]',
        numCodeSnippets,
        () => {
          const element = document.querySelector(hash);
          element?.scrollIntoView();
        },
        50,
        500
      );
    }
  }, [href, hash, numCodeSnippets]);

  return (
    <>
      <SocialGraph url={`${homepageUrl}${fullPath}/`} title={title} desc={description} />
      <Root hasRightRail={hasHeadings}>
        <Header>
          <Title>{isInstallPage ? `${title} for ${stylizeRenderer(renderer)}` : title}</Title>
          <RendererSelector coreRenderers={coreRenderers} communityRenderers={communityRenderers} />
          {unsupported && (
            <UnsupportedBanner>
              This feature is not supported in {stylizeRenderer(renderer)} yet. Help the open source
              community by contributing a PR.
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
        {hasHeadings && (
          <RightRail>
            {is2Col ? (
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
            ) : (
              <InPageTOC collapsed items={pageTocItems} />
            )}
          </RightRail>
        )}
        <Content>
          <MDWrapper>
            <MDXProvider
              components={{
                pre: Pre,
                CodeSnippets: CodeSnippetsWithState,
                FeatureSnippets: FeatureSnippetsWithState,
                RendererSupportTable: RendererSupportTableWithState,
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
      }
      tableOfContents
    }
  }
`;
