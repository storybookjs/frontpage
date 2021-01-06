import { graphql } from 'gatsby';

export const addonItem = graphql`
  fragment AddonItem on ADDON_Addon {
    id: name
    name
    displayName
    description
    icon
    authors {
      id: username
      avatarUrl: gravatarUrl
      name: username
    }
    weeklyDownloads
    tags {
      name
      displayName
      description
      icon
    }
    repositoryUrl
    npmUrl
    appearance: verified
    verifiedCreator
  }
`;
