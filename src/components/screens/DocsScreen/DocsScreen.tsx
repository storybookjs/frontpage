import React from 'react';
import styled from 'styled-components';
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

const Title = styled.h1``;

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

function DocsScreen({ data, pageContext, ...props }) {
  const {
    currentPage: {
      html,
      frontmatter: { title },
    },
  } = data;
  const { tocItem, nextTocItem } = pageContext;
  return (
    <>
      <MDWrapper>
        <Title>{title}</Title>
        <StyledHighlight>{html}</StyledHighlight>
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
    currentPage: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      ...DocsLayoutCurrentPageQuery
    }
  }
`;
