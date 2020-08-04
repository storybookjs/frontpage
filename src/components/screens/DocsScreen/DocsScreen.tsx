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
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';

import { mdFormatting } from '../../../styles/formatting';

const { color, typography } = styles;

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

function CodeSnippets({ snippets, ...rest }) {
  // TODO: Change hardcoded 'react' to use the pageContext's framework
  const snippetsByFramework = snippets.filter(({ metadata }) => metadata.framework === 'react');
  return snippetsByFramework.map(({ metadata, Snippet }) => <Snippet />);
}

function DocsScreen({ data, pageContext }) {
  const {
    currentPage: {
      body,
      frontmatter: { title },
    },
  } = data;
  const { tocItem, nextTocItem } = pageContext;
  const CodeSnippetsWithPageContext = useMemo(() => {
    return (props) => <CodeSnippets pageContext={pageContext} {...props} />;
  }, []);

  return (
    <>
      <MDSpacing>
        <MDWrapper>
          <Title>{title}</Title>
          <MDXProvider components={{ CodeSnippets: CodeSnippetsWithPageContext }}>
            <StyledHighlight withHTMLChildren={false}>
              <MDXRenderer title={title}>{body}</MDXRenderer>
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
                  href={nextTocItem.path}
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
