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
import { graphql, Link as GatsbyLink } from 'gatsby';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';

import { mdFormatting } from '../../../styles/formatting';

const { color, typography } = styles;

// The ScreenWrapper padding allows the box-shadow of the ShadowBoxCTA to show
const ScreenWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`;

const Title = styled.div`
  color: ${color.darkest};
  font-size: ${typography.size.l1}px;
  font-weight: ${typography.weight.black};
  letter-spacing: -0.33px;
  line-height: 40px;
  margin-bottom: 9px;
`;

const MDWrapper = styled.div`
  ${mdFormatting}
  flex: 1;
  overflow: hidden;
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

function DocsScreen({ data, pageContext, ...props }) {
  const {
    currentPage: {
      html,
      frontmatter: { title },
    },
  } = data;
  const { docsToc, tocItem, nextTocItem } = pageContext;
  return (
    <ScreenWrapper {...props}>
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
      <GithubLinkWrapper>
        <GithubLinkItem tertiary href={tocItem.githubUrl} target="_blank" rel="noopener">
          <span role="img" aria-label="write">
            ✍️
          </span>{' '}
          Edit on GitHub – PRs welcome!
        </GithubLinkItem>
      </GithubLinkWrapper>
    </ScreenWrapper>
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
