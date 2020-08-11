import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { global, styles } from '@storybook/design-system';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Release from './Release';

const { GlobalStyle } = global;

const { pageMargins, breakpoint } = styles;

const Content = styled.div`
  ${pageMargins}

  padding-top: 3rem;
  padding-bottom: 3rem;
  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

function IframeReleasesScreen({ data }) {
  const {
    currentPage: {
      body,
      frontmatter: { title },
    },
  } = data;

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Content>
        <Release title={title} body={body} />
      </Content>
    </>
  );
}

IframeReleasesScreen.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default IframeReleasesScreen;

export const query = graphql`
  query IframeReleasesScreenQuery($slug: String!) {
    currentPage: mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
      fields {
        version
        slug
      }
    }
  }
`;
