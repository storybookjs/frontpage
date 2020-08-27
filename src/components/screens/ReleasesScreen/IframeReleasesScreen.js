import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { global, styles } from '@storybook/design-system';
import styled, { createGlobalStyle } from 'styled-components';
import Helmet from 'react-helmet';

import Release from './Release';

const { GlobalStyle } = global;

const { pageMargins, breakpoint } = styles;

// The white background is necessary so that the page text is visible when
// this iframe is being used in a 'dark' theme context. Otherwise, the
// background & text are both dark.
const WhiteBackground = createGlobalStyle`body { background: white; }`;

const Content = styled.div`
  ${pageMargins}

  padding-top: 3rem;
  padding-bottom: 3rem;
  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

function IframeReleasesScreen({ data, ...rest }) {
  const {
    currentPage: {
      body,
      frontmatter: { title },
    },
  } = data;
  const wrapperRef = useRef();

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      const links = wrapperRef.current.querySelectorAll('a');
      links.forEach((link) => {
        /* eslint-disable no-param-reassign */
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        /* eslint-enable no-param-reassign */
      });
    }
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef}>
      <GlobalStyle />
      <WhiteBackground />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Content>
        <Release title={title} body={body} />
      </Content>
    </div>
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
