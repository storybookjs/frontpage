import React, { useMemo } from 'react';
import styled from 'styled-components';
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
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import useSiteMetadata from '../../lib/useSiteMetadata';

import { mdFormatting } from '../../../styles/formatting';
import buildPathWithFramework from '../../../util/build-path-with-framework';
import stylizeFramework from '../../../util/stylize-framework';

const { color, spacing, typography } = styles;

const Title = styled.div`
  color: ${color.darkest};
  font-size: ${typography.size.l1}px;
  font-weight: ${typography.weight.black};
  letter-spacing: -0.33px;
  line-height: 40px;
  margin-bottom: 9px;
`;

// The right and left padding here is used to allow for space to show elements
// outside of the viewport. These values are exported because they are used to
// generate negative margins on a container elsewhere that needs to hide the
// overflow in order to contain the content inside of <Highlight />. By using
// the combo of padding & negative margins, the full width of the section is
// maintained in addition to the containment of the <Highlight /> content.
export const contentLeftPadding = 28;
export const contentRightPadding = 10;
const MDSpacing = styled.div`
  padding-left: ${contentLeftPadding}px;
  padding-right: ${contentRightPadding}px;
`;

const MDWrapper = styled.div`
  ${mdFormatting}
  flex: 1;
`;

const StyledHighlight = styled(Highlight)`
  > * > *:last-child {
    margin-bottom: 0;
  }
`;

const NextSubheading = styled(Subheading)`
  color: ${color.mediumdark};
  display: block;
  margin-bottom: 17px;
`;

const NextNavigation = styled.div`
  margin-top: 48px;
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

function DocsScreen({ data, pageContext }) {
  const {
    currentPage: {
      body,
      frontmatter: { title },
    },
  } = data;
  const { featureGroups } = useSiteMetadata();
  const { framework, docsToc, slug, tocItem, nextTocItem } = pageContext;
  const CodeSnippetsWithCurrentFramework = useMemo(() => {
    return (props) => <CodeSnippets currentFramework={framework} {...props} />;
  }, [framework]);

  const FrameworkSupportTableWithFeaturesAndCurrentFramework = useMemo(() => {
    return ({ frameworks }) => (
      <FrameworkSupportTable
        frameworks={frameworks}
        currentFramework={framework}
        featureGroups={featureGroups}
      />
    );
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
      <MDSpacing>
        <MDWrapper>
          <Title>{title}</Title>
          {unsupported && (
            <UnsupportedBanner>
              This feature is not supported in {stylizeFramework(framework)} yet. Help the open
              source community by contributing a PR.
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
              CodeSnippets: CodeSnippetsWithCurrentFramework,
              FrameworkSupportTable: FrameworkSupportTableWithFeaturesAndCurrentFramework,
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
      </MDSpacing>
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
      ...DocsLayoutCurrentPageQuery
    }
  }
`;
