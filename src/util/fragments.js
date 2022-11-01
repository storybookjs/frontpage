import { graphql } from 'gatsby';

export const addonItem = graphql`
  fragment AddonItem on INTEGRATION_Addon {
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

export const recipeItem = graphql`
  fragment RecipeItem on INTEGRATION_Recipe {
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
    weeklyViews
    tags {
      name
      displayName
      description
      icon
    }
  }
`;
