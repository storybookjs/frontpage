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
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { DEFAULT_CODE_LANGUAGE, CODE_LANGUAGES } from '../../../constants/code-languages';
import { LS_SELECTED_CODE_LANGUAGE_KEY } from '../../../constants/local-storage';
import { useLocalStorage } from '../../../hooks/use-local-storage';
import { mdFormatting } from '../../../styles/formatting';
import buildPathWithFramework from '../../../util/build-path-with-framework';
import relativeToRootLinks from '../../../util/relative-to-root-links';
import stylizeFramework from '../../../util/stylize-framework';
import { FeatureSnippets } from './FeatureSnippets';
import { Pre } from '../../basics/Pre';
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

const GithubLinkWrapper = styled.div`
  margin-top: 3rem;
  text-align: center;
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
  } = useSiteMetadata();
  const { framework, docsToc, fullPath, slug, tocItem, nextTocItem, isInstallPage } = pageContext;

  const [codeLanguage, setCodeLanguage] = useLocalStorage<keyof typeof CODE_LANGUAGES>(
    LS_SELECTED_CODE_LANGUAGE_KEY,
    DEFAULT_CODE_LANGUAGE
  );

  React.useLayoutEffect(() => {
    if (!Object.keys(CODE_LANGUAGES).includes(codeLanguage)) {
      // Invalid code language in local storage, reset to default
      setCodeLanguage(DEFAULT_CODE_LANGUAGE);
    }
  }, [codeLanguage, setCodeLanguage]);

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
  const LinkWithVersion = useMemo(() => {
    return ({ children, href, version, ...props }) => {
      const url = relativeToRootLinks(href, framework, location.pathname, version);
      return (
        <a href={url} {...props}>
          {children}
        </a>
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            YouTubeCallout,
            a: LinksWithPrefix,
            LinkWithVersion,
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

      {tocItem && tocItem.githubUrl && (
        <GithubLinkWrapper>
          <GithubLinkItem tertiary href={tocItem.githubUrl} target="_blank" rel="noopener">
            <span role="img" aria-label="write">
              ✍️
            </span>{' '}
            Edit on GitHub – PRs welcome!
          </GithubLinkItem>
        </GithubLinkWrapper>
      )}
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
