const { validateResponse } = require('../create-integrations-pages/helpers');

const fetchHomePageData = (graphql) =>
  graphql(
    `
      {
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
                "nasa-jpl-explorer-1"
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
    `
  )
    .then(validateResponse((data) => data.storybookProjects && data.dxData))
    .then(({ data }) => data);

module.exports = fetchHomePageData;
