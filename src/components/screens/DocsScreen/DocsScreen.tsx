import React, { useMemo } from 'react';
import { styled } from '@storybook/theming';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import {
  Button,
  Highlight,
  Link,
  ShadowBoxCTA,
  Subheading,
  styles,
} from '@storybook/design-system';
import { graphql } from 'gatsby';
import { CodeSnippets } from './CodeSnippets';
import { rendererSupportsFeature, RendererSupportTable } from './RendererSupportTable';
import { SocialGraph } from '../../basics';
import { Callout } from '../../basics/Callout';
import { Pre } from '../../basics/Pre';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { mdFormatting } from '../../../styles/formatting';
import buildPathWithVersion from '../../../util/build-path-with-version';
import relativeToRootLinks from '../../../util/relative-to-root-links';
import stylizeRenderer from '../../../util/stylize-renderer';
import { useDocsContext } from './DocsContext';
import { FeatureSnippets } from './FeatureSnippets';
import { Feedback } from './Feedback';
import { If } from './If';
import { YouTubeCallout } from './YouTubeCallout';
import { RendererSelector } from './RendererSelector';

const { color, spacing, typography } = styles;

const Title = styled.h1``;

const MDWrapper = styled.main`
  ${mdFormatting}
  flex: 1;
`;

const NextSubheading = styled(Subheading)`
  color: ${color.mediumdark};
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
  border-radius: ${spacing.borderRadius.small}px;
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
    },
  } = data;
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

      <MDWrapper>
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
    }
  }
`;
