import { graphql } from 'gatsby';

export const addonItem = graphql`
  fragment AddonItem on AddonsYaml {
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
    tags
    repositoryUrl
    addonUrl: npmUrl
    appearance: verified
    verifiedCreator
  }
`;
