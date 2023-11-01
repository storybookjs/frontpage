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
import { frameworkSupportsFeature, FrameworkSupportTable } from './FrameworkSupportTable';
import { SocialGraph } from '../../basics';
import { Callout } from '../../basics/Callout';
import { Pre } from '../../basics/Pre';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { mdFormatting } from '../../../styles/formatting';
import buildPathWithFramework from '../../../util/build-path-with-framework';
import relativeToRootLinks from '../../../util/relative-to-root-links';
import stylizeFramework from '../../../util/stylize-framework';
import { useDocsContext } from './DocsContext';
import { FeatureSnippets } from './FeatureSnippets';
import { Feedback } from './Feedback';
import { IfRenderer } from './IfRenderer';
import { YouTubeCallout } from './YouTubeCallout';

const { color, spacing, typography } = styles;

const Title = styled.h1``;

const MDWrapper = styled.main`
  ${mdFormatting}
  flex: 1;
`;

const StyledHighlight = styled(Highlight)`
  -webkit-text-size-adjust: none;

  > * > *:last-child {
    margin-bottom: 0;
  }
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
    coreFrameworks,
    communityFrameworks,
    description,
    featureGroups,
    urls: { homepageUrl },
    versionString,
  } = useSiteMetadata();
  const { framework, docsToc, fullPath, slug, tocItem, nextTocItem, isInstallPage } = pageContext;

  const {
    codeLanguage: [codeLanguage],
  } = useDocsContext();

  const CodeSnippetsWithCurrentFrameworkAndCodeLanguage = useMemo(() => {
    return (props) => (
      <CodeSnippets currentFramework={framework} currentCodeLanguage={codeLanguage} {...props} />
    );
  }, [framework, codeLanguage]);
  const FeatureSnippetsWithCurrentFramework = useMemo(() => {
    return (props) => <FeatureSnippets currentFramework={framework} {...props} />;
  }, [framework]);
  const FrameworkSupportTableWithFeaturesAndCurrentFramework = useMemo(() => {
    return ({ core }) => (
      <FrameworkSupportTable
        frameworks={core ? coreFrameworks : communityFrameworks}
        currentFramework={framework}
        featureGroups={featureGroups}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [framework]);
  const LinksWithPrefix = useMemo(() => {
    return ({ children, href, ...props }) => {
      const url = relativeToRootLinks(href, framework, location.pathname);
      return (
        <a href={url} {...props}>
          {children}
        </a>
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [framework]);
  const IfRendererWithCurrentFramework = useMemo(() => {
    return (props) => <IfRenderer currentRenderer={framework} {...props} />;
  }, [framework]);

  const features = featureGroups.flatMap((group) => group.features);
  const feature = features.find((fs) => `/docs${fs.path}/` === slug);
  const unsupported = feature && !frameworkSupportsFeature(framework, feature);

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
        <Title>{isInstallPage ? `${title} for ${stylizeFramework(framework)}` : title}</Title>
        {unsupported && (
          <UnsupportedBanner>
            This feature is not supported in {stylizeFramework(framework)} yet. Help the open source
            community by contributing a PR.
            {featureSupportItem && (
              <>
                {' '}
                <Link LinkWrapper={GatsbyLinkWrapper} href={featureSupportItem.path} withArrow>
                  View feature coverage by framework
                </Link>
              </>
            )}
          </UnsupportedBanner>
        )}
        <MDXProvider
          components={{
            pre: Pre,
            CodeSnippets: CodeSnippetsWithCurrentFrameworkAndCodeLanguage,
            FeatureSnippets: FeatureSnippetsWithCurrentFramework,
            FrameworkSupportTable: FrameworkSupportTableWithFeaturesAndCurrentFramework,
            IfRenderer: IfRendererWithCurrentFramework,
            YouTubeCallout,
            a: LinksWithPrefix,
            Callout,
          }}
        >
          <StyledHighlight withHTMLChildren={false}>
            <MDXRenderer>{body}</MDXRenderer>
          </StyledHighlight>
        </MDXProvider>
      </MDWrapper>

      {nextTocItem && (
        <NextNavigation>
          <NextSubheading>Next</NextSubheading>
          <ShadowBoxCTA
            action={
              <Button
                appearance="secondary"
                href={buildPathWithFramework(nextTocItem.path, framework)}
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
            framework={framework}
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
