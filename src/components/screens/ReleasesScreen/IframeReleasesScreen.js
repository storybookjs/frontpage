import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { global, styles } from '@storybook/design-system';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Release from './Release';

const { GlobalStyle } = global;

const { pageMargins } = styles;

const Content = styled.div`
  ${pageMargins}
  padding-top: 66px;
  padding-bottom: 66px;
`;

function IframeReleasesScreen({ data }) {
  const {
    currentPage: {
      html,
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
        <Release title={title} html={html} />
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
    currentPage: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
