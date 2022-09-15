import React, { Fragment, useMemo } from 'react';
import { graphql } from 'gatsby';
import { global } from '@storybook/design-system';

import { IndexScreen } from '../components/screens/IndexScreen/IndexScreen';

const { GlobalStyle } = global;

const HomePage = ({ data }) => {
  const {
    storybookProjects,
    dxData: {
      npmDownloads,
      latestPost,
      twitterFollowerCount,
      discordMemberCount,
      githubContributorCount,
      youTubeSubscriberCount,
    },
  } = data;

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
      <IndexScreen
        latestBlogPost={latestPost}
        projects={projects}
        npmDownloads={npmDownloads}
        twitterFollowerCount={twitterFollowerCount}
        discordMemberCount={discordMemberCount}
        githubContributorCount={githubContributorCount}
        youTubeSubscriberCount={youTubeSubscriberCount}
      />
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

    dxData {
      npmDownloads
      twitterFollowerCount
      discordMemberCount
      twitterFollowerCount
      discordMemberCount
      githubContributorCount
      youTubeSubscriberCount
      latestPost {
        title
        url
      }
    }
  }
`;
