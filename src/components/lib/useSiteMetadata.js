import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const result = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          ogImage
          googleSiteVerification
          latestVersion
          urls {
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
            docs {
              home
              addonInstruction
            }
            tutorials
            addons
            community
            useCases
            support
            team
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
            framework {
              react
              reactNative
              vue
              angular
              ember
              html
              svelte
              mithril
              riot
            }
            officialAddons {
              knobs
              actions
              source
              info
              viewport
              notes
              storyshots
              backgrounds
              accessibility
              console
              links
            }
          }
        }
      }
    }
  `);

  return result.site.siteMetadata;
};

export default useSiteMetadata;
