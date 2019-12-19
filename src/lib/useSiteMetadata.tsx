import { useStaticQuery, graphql } from 'gatsby';
import { File } from '../generated/graphql';

const useSiteMetadata = () => {
  const result = useStaticQuery(graphql`
    query SiteMetaData {
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
            docsIntro
            addonInstruction
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
              docs
              storyshots
              backgrounds
              accessibility
              console
              links
            }
          }
        }
      }
      allFile(
        sort: { fields: absolutePath, order: ASC }
        filter: {
          childMarkdownRemark: { id: { regex: "/./" } }
          sourceInstanceName: { regex: "/docs-(?!next).*/" }
        }
      ) {
        group(field: sourceInstanceName) {
          fieldValue
          nodes {
            relativeDirectory
            sourceInstanceName
            name
            childMarkdownRemark {
              frontmatter {
                id
                title
              }
            }
          }
        }
      }
    }
  `);

  return {
    ...result.site.siteMetadata,
    nav: result.allFile.group.reduce((acc, { fieldValue, nodes }) => {
      acc[fieldValue] = {};
      nodes.forEach(n => {
        transformNavigationNodes(acc[fieldValue], n);
      });
      return acc;
    }, {}),
  };
};

const transformNavigationNodes = (
  acc: Record<string, any>,
  { sourceInstanceName, name, relativeDirectory, childMarkdownRemark }: File
) => {
  switch (sourceInstanceName) {
    case 'docs-maintenance': {
      acc[name] = {
        key: name,
        to: `/${name.toLowerCase()}`,
        title: name.toLowerCase().replace(/_/g, ' '),
      };
      break;
    }
    case 'docs-addons': {
      acc[name] = { key: name, to: `/addons/${name}`, title: name };
      break;
    }
    case 'docs-master':
    default: {
      const [key] = relativeDirectory.split('/');
      if (!acc[key] && key) {
        acc[key] = {
          key,
          title: key,
          to: `/docs/${relativeDirectory}`,
        };
      }
      break;
    }
  }
};

export default useSiteMetadata;
