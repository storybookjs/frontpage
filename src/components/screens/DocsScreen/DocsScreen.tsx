import React from 'react';
import styled from 'styled-components';
import { Highlight, styles } from '@storybook/design-system';
import { graphql } from 'gatsby';

import { releaseFormatting } from '../../../styles/formatting';

const { color, typography } = styles;

const Title = styled.div`
  color: ${color.darkest};
  font-size: ${typography.size.l1}px;
  font-weight: ${typography.weight.black};
  letter-spacing: -0.33px;
  line-height: 40px;
  margin-bottom: 9px;
`;

const Wrapper = styled.div`
  ${releaseFormatting}
  flex: 1;
  overflow: hidden;
`;

const StyledHighlight = styled(Highlight)`
  > * > *:last-child {
    margin-bottom: 0;
  }
`;

function DocsScreen({ data, ...props }) {
  const {
    currentPage: {
      html,
      frontmatter: { title },
    },
  } = data;

  return (
    <Wrapper {...props}>
      <Title>{title}</Title>
      <StyledHighlight>{html}</StyledHighlight>
    </Wrapper>
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
