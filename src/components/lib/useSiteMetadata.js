import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const result = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          ogImage
          ogImageAddons
          googleSiteVerification
          version
          versionString
          latestVersion
          latestVersionString
          isLatest
          contributorCount
          coreFrameworks
          communityFrameworks
          featureGroups {
            name
            features {
              name
              supported
              unsupported
              path
              repoPath
            }
          }
          urls {
            addonsLearnLinks {
              title
              icon
              to
            }
            gitHubOrg
            homepageUrl
            docsUrl
            npmApiBase
            navLinks {
              title
              href
              isGatsby
            }
            navCommunityLinks {
              title
              href
              isGatsby
            }
            gitHub {
              repo
              frontpage
              issues
              releases
              contributors
              brand
            }
            npm
            openCollective
            npmApi {
              react
              reactNative
              vue
              angular
              ember
              html
              svelte
              mithril
              riot
              polymer
              preact
            }
            home
            docs
            releases
            tutorials
            addons
            community
            useCases
            support
            team
            addonsApi
            blog
            medium
            twitter
            chat
            youtube
            brand
            designSystem
            badge
            presentation
            video
            officialAddons {
              knobs
              controls
              actions
              source
              info
              viewport
              docs
              storyshots
              backgrounds
              accessibility
              console
              links
              toolbars
            }
          }
        }
      }
    }
  `);

  return result.site.siteMetadata;
};

export default useSiteMetadata;
