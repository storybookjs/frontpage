import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { global, styles } from '@storybook/design-system';
import { css, Global, styled } from '@storybook/theming';
import Helmet from 'react-helmet';

import Release from './Release';

const { GlobalStyle } = global;

const { pageMargins, breakpoint } = styles;

// The white background is necessary so that the page text is visible when
// this iframe is being used in a 'dark' theme context. Otherwise, the
// background & text are both dark.
const whiteBackground = css`
  body {
    background: white;
  }
`;

const Content = styled.div`
  ${pageMargins}

  padding-top: 3rem;
  padding-bottom: 3rem;

  && .remark-header-link {
    display: none;
  }

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
  const releaseRef = useRef();

  useEffect(() => {
    if (releaseRef && releaseRef.current) {
      const links = releaseRef.current.querySelectorAll('a');
      links.forEach((link) => {
        /* eslint-disable no-param-reassign */
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        /* eslint-enable no-param-reassign */
      });
    }
  }, [releaseRef]);

  return (
    <>
      <GlobalStyle />
      <Global styles={whiteBackground} />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Content>
        <Release ref={releaseRef} title={title} body={body} />
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
