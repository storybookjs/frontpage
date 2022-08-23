import React, { Fragment, useMemo } from 'react';
import { graphql } from 'gatsby';
import { global } from '@storybook/design-system';

import IndexScreen from '../components/screens/IndexScreen/IndexScreen';

const { GlobalStyle } = global;

const HomePage = ({ data }) => {
  const {
    latestBlogPosts: { edges },
    storybookProjects,
  } = data;
  const latestBlogPost = edges[0]?.node;

  const projects = useMemo(
    () =>
      storybookProjects.projects.map(({ slug, logo, ...project }) => ({
        logoUrl: logo.url,
        height: logo.height,
        width: logo.width,
        projectUrl: `https://storybook.js.org/showcase/${slug}`,
        ...project,
      })),
    [storybookProjects]
  );

  return (
    <Fragment>
      <GlobalStyle />
      <IndexScreen latestBlogPost={latestBlogPost} projects={projects} />
    </Fragment>
  );
};

export default HomePage;

// prettier-ignore
export const query = graphql`
  query IndexScreenQuery {
    storybookProjects {
      projects(
        where: {
          slug_in: [
            "microsoft-fluent-ui-react"
            "shopify-polaris-react"
            "adobe-spectrum-web-components"
            "bbc-psammead"
            "audi-ui-react"
            "wordpress-gutenberg"
          ]
        }
      ) {
        slug
        logo {
          url
          width
          height
        }
        logoAlt: org
        name: title
        accentColor {
          hex
        }
      }
    }

    latestBlogPosts: allGhostPost(
      filter: { tags: { elemMatch: { slug: { nin: ["data-schema", "hash-preview"] } } } }
      sort: { order: DESC, fields: [published_at] }
      limit: 1
    ) {
      edges {
        node {
          slug
          title
        }
      }
    }

    dxData {
      npmDownloads
    }
  }
`;
